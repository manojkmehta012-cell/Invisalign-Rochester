export const CLINIC_NAME = "GM Dental & Implant Centre";

// TODO: clinic phone number still pending from owner; WhatsApp confirmed.
export const PHONE_DISPLAY = "01634 000 000";
export const PHONE_TEL = "tel:+441634000000";
export const WHATSAPP_URL =
  "https://wa.me/447769076413?text=" +
  encodeURIComponent("Hello GM Dental, I would like to book a free Invisalign consultation in Rochester.");

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
