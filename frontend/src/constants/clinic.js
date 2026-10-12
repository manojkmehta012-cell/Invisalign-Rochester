export const CLINIC_NAME = "GM Dental & Implant Centre";

// TODO: owner will supply the real clinic phone number and WhatsApp number.
// Placeholders use the Rochester area code and the UK fictional mobile range.
export const PHONE_DISPLAY = "01634 000 000";
export const PHONE_TEL = "tel:+441634000000";
export const WHATSAPP_URL =
  "https://wa.me/447700900000?text=" +
  encodeURIComponent("Hello GM Dental, I would like to book a free cosmetic dentistry consultation in Rochester.");

export const TREATMENTS = [
  "Cosmetic Dentistry",
  "Invisalign",
  "Teeth Whitening",
  "Composite Bonding",
  "Veneers",
  "Smile Makeover",
];

export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
