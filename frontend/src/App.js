import React, { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Results from "@/components/landing/Results";
import InvisalignOffer from "@/components/landing/InvisalignOffer";
import Journey from "@/components/landing/Journey";
import Testimonials from "@/components/landing/Testimonials";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import StickyCta from "@/components/landing/StickyCta";

class Boundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="min-h-screen bg-ink-900 text-cream flex items-center justify-center p-8 text-center">
          <p data-testid="app-error-fallback">Something went wrong. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <Boundary>
      <div className="bg-white text-ink-900 min-h-screen pb-16 md:pb-0">
        <main>
          <Hero />
          <Marquee />
          <Results />
          <InvisalignOffer />
          <Journey />
          <Testimonials />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <StickyCta />
      </div>
    </Boundary>
  );
}

export default App;
