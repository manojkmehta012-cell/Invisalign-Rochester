import { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { TREATMENTS, PHONE_TEL, PHONE_DISPLAY } from "@/constants/clinic";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function LeadForm({ idPrefix = "lead-form" }) {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", treatment: "", location: "Rochester" });
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const handler = (e) => setForm((f) => ({ ...f, treatment: e.detail || f.treatment }));
    window.addEventListener("gm:prefill-treatment", handler);
    return () => window.removeEventListener("gm:prefill-treatment", handler);
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrMsg("");
    try {
      await axios.post(`${API}/leads`, form);
      setStatus("success");
    } catch (ex) {
      const detail = ex?.response?.data?.detail;
      let msg = "We could not send your enquiry. Please try again, message us on WhatsApp, or call the clinic.";
      if (Array.isArray(detail)) {
        msg = detail.map((d) => (typeof d === "string" ? d : d.msg || "")).filter(Boolean).join(" ");
      } else if (typeof detail === "string" && detail) {
        msg = detail;
      }
      setErrMsg(msg);
      setStatus("error");
    }
  };

  if (status === "success") {
    const firstName = form.name.trim().split(/\s+/)[0];
    return (
      <div data-testid={`${idPrefix}-success`} className="h-full flex flex-col items-start justify-center gap-4 bg-white border border-gold/40 rounded-2xl p-8">
        <CheckCircle2 className="text-gold" size={44} strokeWidth={1.5} />
        <h3 className="font-display text-2xl text-ink-900">Thank you, {firstName}.</h3>
        <p className="text-smoke leading-relaxed">
          Your enquiry is with our Rochester team. We will be in touch shortly to arrange your free consultation and
          smile simulation.
        </p>
        <p className="text-sm text-smoke">
          Prefer to talk now?{" "}
          <a href={PHONE_TEL} data-testid={`${idPrefix}-success-call`} className="text-gold-hover underline underline-offset-4">
            Call {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} data-testid={idPrefix} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="field-label">Full Name</label>
          <input id={`${idPrefix}-name`} data-testid={`${idPrefix}-name`} className="field-input" required minLength={2} placeholder="Your name" value={form.name} onChange={set("name")} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-mobile`} className="field-label">Mobile Number</label>
          <input id={`${idPrefix}-mobile`} data-testid={`${idPrefix}-mobile`} className="field-input" required type="tel" placeholder="07123 456789" value={form.mobile} onChange={set("mobile")} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${idPrefix}-email`} className="field-label">Email Address</label>
          <input id={`${idPrefix}-email`} data-testid={`${idPrefix}-email`} className="field-input" required type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-treatment`} className="field-label">Preferred Treatment</label>
          <select id={`${idPrefix}-treatment`} data-testid={`${idPrefix}-treatment`} className="field-input" required value={form.treatment} onChange={set("treatment")}>
            <option value="" disabled>Choose a treatment</option>
            {TREATMENTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-location`} className="field-label">Preferred Location</label>
        <input id={`${idPrefix}-location`} data-testid={`${idPrefix}-location`} className="field-input bg-cream-soft/60" value={form.location} readOnly aria-readonly="true" />
        <p className="mt-1.5 text-xs text-smoke/80">This enquiry goes directly to our Rochester clinic.</p>
      </div>

      {status === "error" && (
        <div data-testid={`${idPrefix}-error`} role="alert" className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 text-red-800 px-4 py-3 text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{errMsg}</span>
        </div>
      )}

      <button
        type="submit"
        data-testid={`${idPrefix}-submit`}
        disabled={status === "submitting"}
        className="w-full rounded-full bg-gold hover:bg-gold-hover disabled:opacity-70 text-ink-900 font-semibold tracking-[0.12em] uppercase text-sm px-8 py-4 transition-colors inline-flex items-center justify-center gap-2"
      >
        {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
        {status === "submitting" ? "Sending your enquiry" : "Book Your Free Consultation"}
      </button>
      <p className="text-xs text-smoke/75 leading-relaxed">
        By submitting this form you are asking GM Dental Rochester to contact you about your enquiry. Treatment is
        always subject to a clinical assessment.
      </p>
    </form>
  );
}
