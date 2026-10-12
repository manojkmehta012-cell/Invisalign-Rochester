import React, { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import SmilePlan from "@/components/landing/SmilePlan";
import InvisalignOffer from "@/components/landing/InvisalignOffer";
import Results from "@/components/landing/Results";
import Treatments from "@/components/landing/Treatments";
import Journey from "@/components/landing/Journey";
import Trust from "@/components/landing/Trust";
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
      <div className="bg-ink-900 text-cream min-h-screen pb-16 md:pb-0">
        <Nav />
        <main>
          <Hero />
          <section id="book" className="relative z-10 -mt-12 md:-mt-20 px-4 sm:px-8 lg:px-16">
            <div data-testid="hero-form-panel" className="max-w-7xl mx-auto">
              <FinalCta embed />
            </div>
          </section>
          <Marquee />
          <SmilePlan />
          <InvisalignOffer />
          <Results />
          <Treatments />
          <Journey />
          <Trust />
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
