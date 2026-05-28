import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  LIVE_AI_USAGE_LABEL,
  buildLiveAiMessages,
  buildOpenAiCompatibleRequest,
  extractAiDraftText,
  validateAiDraftText
} from "../src/live-ai-core.mjs";

const DEFAULT_BASE_URL = "https://api.tokenfactory.nebius.com/v1/";
const DEFAULT_MODEL = "moonshotai/Kimi-K2.6";
const DEFAULT_PORT = 8787;

loadEnvFile(resolve(process.cwd(), ".env.local"));

let requestCount = 0;

const config = {
  apiKey: process.env.NEBIUS_API_KEY || "",
  baseUrl: trimTrailingSlash(process.env.NEBIUS_BASE_URL || DEFAULT_BASE_URL),
  model: process.env.NEBIUS_MODEL || DEFAULT_MODEL,
  maxRequests: Number(process.env.LIVE_AI_MAX_REQUESTS || 10),
  maxOutputTokens: Number(process.env.LIVE_AI_MAX_OUTPUT_TOKENS || 800),
  port: Number(process.env.LIVE_AI_PORT || DEFAULT_PORT)
};

const server = http.createServer(async (request, response) => {
  setCorsHeaders(response);
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  try {
    if (request.method === "GET" && request.url === "/health") {
      sendJson(response, 200, {
        ok: true,
        configured: Boolean(config.apiKey),
        model: config.model,
        remainingRequests: Math.max(config.maxRequests - requestCount, 0),
        usageLabel: LIVE_AI_USAGE_LABEL
      });
      return;
    }

    if (request.method === "POST" && request.url === "/api/live-draft") {
      await handleLiveDraft(request, response);
      return;
    }

    sendJson(response, 404, { ok: false, error: "Not found." });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error?.message || "Live AI server failed."
    });
  }
});

async function handleLiveDraft(request, response) {
  if (!config.apiKey) {
    sendJson(response, 503, {
      ok: false,
      error: "AI draft unavailable locally. Set NEBIUS_API_KEY in .env.local and restart npm run live:ai."
    });
    return;
  }
  if (requestCount >= config.maxRequests) {
    sendJson(response, 429, {
      ok: false,
      error: `Local AI request cap reached (${config.maxRequests}). Restart the server or increase LIVE_AI_MAX_REQUESTS locally.`
    });
    return;
  }

  const body = await readJsonBody(request);
  const records = Array.isArray(body.records) ? body.records : [];
  if (records.length === 0) {
    sendJson(response, 400, {
      ok: false,
      error: "AI draft requires at least one retrieved LIVE-* source record."
    });
    return;
  }

  const messages = buildLiveAiMessages(body);
  const upstreamRequest = buildOpenAiCompatibleRequest({
    model: config.model,
    messages,
    maxTokens: config.maxOutputTokens
  });

  requestCount += 1;
  let upstreamResponse;
  try {
    upstreamResponse = await callNebius(upstreamRequest);
  } catch (error) {
    sendJson(response, 502, {
      ok: false,
      error: error?.message || "Nebius request failed."
    });
    return;
  }
  const text = extractAiDraftText(upstreamResponse);
  const verdict = validateAiDraftText(text, records);
  if (!verdict.ok) {
    sendJson(response, 422, {
      ok: false,
      error: "AI output was rejected by local safety and citation checks.",
      details: verdict.errors
    });
    return;
  }

  sendJson(response, 200, {
    ok: true,
    draft: {
      text,
      usageLabel: LIVE_AI_USAGE_LABEL,
      model: config.model,
      generatedAt: new Date().toISOString(),
      sourceIds: records.map((record) => record.liveSourceId).filter(Boolean)
    },
    remainingRequests: Math.max(config.maxRequests - requestCount, 0)
  });
}

async function callNebius(payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.apiKey}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`Nebius returned HTTP ${response.status}.`);
    }
    return await response.json();
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("Nebius request timed out.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function readJsonBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        rejectBody(new Error("Request body too large."));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolveBody(raw ? JSON.parse(raw) : {});
      } catch {
        rejectBody(new Error("Request body must be JSON."));
      }
    });
    request.on("error", rejectBody);
  });
}

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "content-type");
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "content-type": "application/json" });
  response.end(JSON.stringify(payload));
}

function trimTrailingSlash(value) {
  return String(value || "").replace(/\/+$/, "");
}

server.listen(config.port, "127.0.0.1", () => {
  const state = config.apiKey ? "configured" : "missing NEBIUS_API_KEY";
  console.log(
    `TargetBench live AI server listening at http://127.0.0.1:${config.port} (${state}, model ${config.model})`
  );
});
