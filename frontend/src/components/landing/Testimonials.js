import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

function VideoCard({ src, poster, quote, context, testid }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      v.controls = true;
      setPlaying(true);
    } else {
      v.pause();
    }
  };

  return (
    <div data-testid={testid} className="max-w-sm mx-auto w-full">
      <div className="relative rounded-3xl overflow-hidden border border-gold/30 bg-cream cursor-pointer" onClick={start}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full aspect-[9/16] object-cover"
          playsInline
          preload="metadata"
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
        {!playing && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-gold text-ink-900 flex items-center justify-center shadow-xl">
              <Play size={24} className="translate-x-[2px]" fill="currentColor" />
            </span>
          </span>
        )}
      </div>
      <p className="mt-5 font-display italic text-lg text-ink-900 leading-relaxed">“{quote}”</p>
      <p className="mt-3 text-xs tracking-[0.18em] uppercase text-gold-hover">{context}</p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" data-testid="patient-testimonials-section" className="bg-white text-ink-900 py-20 lg:py-28 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Patient Stories</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl text-ink-900">
            Hear It From Our Patients
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-12">
          <Reveal>
            <VideoCard
              src="/media/testimonial-elizabeth.mp4"
              poster="/media/testimonial-elizabeth.jpg"
              quote="I feel that I can smile more."
              context="Smile makeover & Invisalign patient"
              testid="testimonial-video-elizabeth"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <VideoCard
              src="/media/testimonial-ella.mp4"
              poster="/media/testimonial-ella.jpg"
              quote="So easy to work with, and communication is very good."
              context="Invisalign patient"
              testid="testimonial-video-ella"
            />
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-12 text-xs text-smoke/70 max-w-2xl leading-relaxed">
            Genuine, unscripted patient videos. Individual experiences and results vary; treatment is always subject
            to a clinical assessment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
