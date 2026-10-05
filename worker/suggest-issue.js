/**
 * Cloudflare Worker: riceve i suggerimenti spot e apre issue
 * sul repo come il proprietario (token in secret CF).
 *
 * Secrets (wrangler / dashboard):
 *   GITHUB_TOKEN  — PAT fine-grained: Issues Read/Write su AleOnRails/luoghi-deriva
 *
 * Deploy:
 *   npx wrangler deploy
 *   npx wrangler secret put GITHUB_TOKEN
 */
const REPO = "AleOnRails/luoghi-deriva";
const ALLOWED_ORIGINS = [
  "https://aleonrails.github.io",
  "http://127.0.0.1:43127",
  "http://localhost:43127",
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin),
    },
  });
}

function buildBody(data) {
  const lines = [
    "### Suggerimento spot (dal sito)",
    "",
    "| Campo | Valore |",
    "| --- | --- |",
    `| **Area** | ${data.area} |`,
    `| **Località** | ${data.localita} |`,
    `| **Livello stimato** | ${data.livello} |`,
  ];
  if (data.contatto) lines.push(`| **Contatto** | ${data.contatto} |`);
  lines.push("", "### Perché aggiungerlo", "", data.perche, "");
  return lines.join("\n");
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, origin);
    }

    if (!env.GITHUB_TOKEN) {
      return json({ error: "Worker non configurato (manca GITHUB_TOKEN)" }, 500, origin);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: "JSON non valido" }, 400, origin);
    }

    const area = String(data.area || "").trim();
    const localita = String(data.localita || "").trim();
    const livello = String(data.livello || "").trim();
    const perche = String(data.perche || "").trim();
    const contatto = String(data.contatto || "").trim();

    if (!area || !localita || !livello || !perche) {
      return json({ error: "Campi obbligatori mancanti" }, 400, origin);
    }
    if (localita.length > 120 || perche.length > 2000 || contatto.length > 120) {
      return json({ error: "Testo troppo lungo" }, 400, origin);
    }

    const title = `[Spot] ${localita} (${area})`;
    const body = buildBody({ area, localita, livello, perche, contatto });

    const gh = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "luoghi-deriva-suggest-worker",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        title,
        body,
        labels: ["suggerimento-spot"],
      }),
    });

    const payload = await gh.json().catch(() => ({}));
    if (!gh.ok) {
      return json(
        {
          error: "Creazione issue fallita",
          detail: payload.message || gh.statusText,
        },
        502,
        origin
      );
    }

    return json(
      {
        ok: true,
        number: payload.number,
        url: payload.html_url,
      },
      201,
      origin
    );
  },
};
