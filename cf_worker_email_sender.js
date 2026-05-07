/**
 * MailerSend contact form — POST JSON only, browser CORS from davidcluniecoaching.com
 *
 * Secrets: MAILERSEND_API_TOKEN
 * Vars:    TO_EMAIL, FROM_EMAIL, optional FROM_NAME
 */

const ALLOWED_ORIGINS = [
    "https://davidcluniecoaching.com",
    "https://www.davidcluniecoaching.com",
  ];
  
  function corsHeaders(allowedOrigin) {
    return {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    };
  }
  
  function json(data, status, allowedOrigin) {
    const h = new Headers({ "Content-Type": "application/json" });
    if (allowedOrigin) {
      for (const [k, v] of Object.entries(corsHeaders(allowedOrigin))) {
        h.set(k, v);
      }
    }
    return new Response(JSON.stringify(data), { status, headers: h });
  }
  
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  
  export default {
    async fetch(request, env) {
      const origin = request.headers.get("Origin") || "";
      const allowed =
        ALLOWED_ORIGINS.includes(origin) ? origin : null;
  
      if (!allowed) {
        return json({ error: "Forbidden. Only POST allowed from " + ALLOWED_ORIGINS.join(', ') }, 403, null);
      }
  
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: new Headers(corsHeaders(allowed)),
        });
      }
  
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
  
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400, allowed);
      }
  
      const firstName = String(body.firstName ?? "").trim();
      const lastName = String(body.lastName ?? "").trim();
      const subject = String(body.subject ?? "").trim();
      const message = String(body.message ?? "").trim();
  
      if (!firstName || !lastName || !subject || !message) {
        return json({ error: "Missing required fields" }, 400, allowed);
      }
  
      const token = env.MAILERSEND_API_TOKEN;
      const toEmail = env.TO_EMAIL;
      const fromEmail = env.FROM_EMAIL;
      const fromName = env.FROM_NAME || "Website Contact";
  
      if (!token || !toEmail || !fromEmail) {
        return json({ error: "Server misconfigured" }, 500, allowed);
      }
  
      const fullSubject = `[Contact] ${subject}`;
      const textBody = [
        `Name: ${firstName} ${lastName}`,
        "",
        message,
      ].join("\n");
  
      const htmlBody =
        `<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>` +
        `<p><strong>Message:</strong></p>` +
        `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`;
  
      const msRes = await fetch("https://api.mailersend.com/v1/email", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: { email: fromEmail, name: fromName },
          to: [{ email: toEmail }],
          subject: fullSubject,
          text: textBody,
          html: htmlBody,
        }),
      });
  
      if (!msRes.ok) {
        const errText = await msRes.text();
        console.error("MailerSend:", msRes.status, errText);
        return json({ error: "Failed to send" }, 502, allowed);
      }
  
      return json({ ok: true }, 200, allowed);
    },
  };