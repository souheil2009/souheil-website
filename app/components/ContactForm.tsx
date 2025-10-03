"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  function friendlyError(msg?: string | null) {
    if (!msg) return "Message not sent.";
    const m = msg.toLowerCase();
    if (m.includes("invalid email domain")) return "Please enter a valid email domain.";
    if (m.includes("invalid email")) return "Please enter a valid email address.";
    if (m.includes("unresolvable email domain")) return "Email domain could not be found. Check for typos.";
    if (m.includes("not deliverable")) return "This email address can’t receive messages. Try another.";
    if (m.includes("email service not configured")) return "Email service not configured on the server.";
    return "Message not sent. Please try again.";
  }

  function validate() {
    const next: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) next.name = "Name is required";
    const emailTrim = email.trim();
    if (!emailTrim) next.email = "Email is required";
    else if (!/.+@.+\..+/.test(emailTrim)) next.email = "Enter a valid email";
    if (!message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    if (!validate()) {
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, phone, hp }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        const msg = friendlyError(data?.error);
        setStatus("error");
        setError(msg);
        // If the error is related to the email, surface it inline
        const emailRelated = [
          "valid email address",
          "valid email domain",
          "email domain could not be found",
          "can’t receive messages",
        ];
        if (emailRelated.some((s) => msg.toLowerCase().includes(s))) {
          setErrors((prev) => ({ ...prev, email: msg }));
        }
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
      setHp("");
      setErrors({});
    } catch (err) {
      setStatus("error");
      setError("Server error");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="grid gap-4 sm:max-w-lg">
        <div>
          <input
            className="h-11 w-full rounded-md border border-foreground/15 bg-background px-3 outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={validate}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            className="h-11 w-full rounded-md border border-foreground/15 bg-background px-3 outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validate}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
        <div>
          <input
            className="h-11 w-full rounded-md border border-foreground/15 bg-background px-3 outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Your phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <textarea
            className="min-h-28 w-full rounded-md border border-foreground/15 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={validate}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Honeypot (hidden from users) */}
        <div className="hidden" aria-hidden>
          <label>
            Do not fill this field
            <input
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-md bg-foreground text-background px-5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send"}
        </button>
      </form>

      {status === "success" && (
        <p role="status" aria-live="polite" className="mt-4 text-sm text-green-600">Message sent.</p>
      )}
      {status === "error" && (
        <p role="status" aria-live="polite" className="mt-4 text-sm text-red-600">{error || "Message not sent."}</p>
      )}
    </div>
  );
}
