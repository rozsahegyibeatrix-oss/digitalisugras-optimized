import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LaptopFrame from "@/components/showcase/LaptopFrame";
import PhoneFrame from "@/components/showcase/PhoneFrame";
import LazyVideo from "@/components/showcase/LazyVideo";
import MiniCoupe from "@/components/showcase/MiniCoupe";
import MiniAtelierV from "@/components/showcase/MiniAtelierV";
import MiniKirembe from "@/components/showcase/MiniKirembe";
import MiniPai from "@/components/showcase/MiniPai";

// These used to point at media.base44.com. Drop your own screenshot/video
// files into public/assets/portfolio/ using these exact filenames (or edit
// the paths below to match whatever you name them).
const PROJECTS = [
  { id: "coupe", name: "Coupé Barber", url: "coupebarber.com", Mini: MiniCoupe, video: "/assets/portfolio/coupe-video.mp4", screenshot: "/assets/portfolio/coupe-screenshot.webp", w: 1400, h: 724 },
  { id: "atelier", name: "Atelier V", url: "atelierv.space", Mini: MiniAtelierV, video: "/assets/portfolio/atelier-video.mp4", screenshot: "/assets/portfolio/atelier-screenshot.webp", w: 1400, h: 731 },
  { id: "kirembe", name: "Kirembe Adventures", url: "kirembeadventures.online", Mini: MiniKirembe, video: "/assets/portfolio/kirembe-video.mp4", screenshot: "/assets/portfolio/kirembe-screenshot.webp", w: 1400, h: 737 },
  { id: "pai", name: "Pai Striking Academy", url: "paistrinkingacademy.space", Mini: MiniPai, video: "/assets/portfolio/pai-video.mp4", screenshot: "/assets/portfolio/pai-screenshot.webp", w: 1400, h: 724 },
];

export default function Portfolio() {
  const { t } = useI18n();
  const W = t.work;
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="mono-tag mb-4">{W.tag}</div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink max-w-xl text-balance">{W.title}</h2>
          <p className="text-muted-fg max-w-sm">{W.sub}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {PROJECTS.map((p, i) => (
            <ShowcaseCard key={p.id} project={p} index={i} data={W.items[i]} labels={W} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ project, index, data, labels }) {
  const Mini = project.Mini;
  const liveUrl = `https://${project.url}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="group overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="mono-tag">{data.type}</div>
          <h3 className="text-xl font-semibold text-ink mt-1 group-hover:text-cobalt transition-colors">
            {data.name}
          </h3>
        </div>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-fg hover:text-cobalt border border-silver/60 rounded-full px-3 py-1.5 hover:border-cobalt/50 transition-colors whitespace-nowrap"
        >
          {labels.live} <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Laptop view + phone with the social video, side by side */}
      <div className="relative flex items-end gap-2 sm:gap-4 lg:gap-6 w-full overflow-x-hidden">
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 rounded-lg sm:rounded-xl hover:shadow-xl transition-shadow duration-300"
          aria-label={`${project.name} — live site`}
        >
          <LaptopFrame url={project.url}>
            <img
              src={project.screenshot}
              alt={`${project.name} website`}
              width={project.w}
              height={project.h}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </LaptopFrame>
        </a>
        {/* On phones the device overlaps the laptop corner; on larger screens it sits beside it */}
        <div className="hidden sm:block absolute sm:static right-2 sm:right-auto bottom-2 sm:bottom-auto w-[140px] sm:w-[120px] lg:w-[150px] aspect-[9/19] drop-shadow-2xl shrink-0 z-10">
          <PhoneFrame>
            {project.video ? (
              <>
                {/* Static recreation shows instantly while the video buffers */}
                <Mini />
                <LazyVideo src={project.video} className="absolute inset-0 w-full h-full object-cover" />
              </>
            ) : (
              <Mini />
            )}
          </PhoneFrame>
        </div>
      </div>
      <p className="text-sm text-muted-fg mt-4">{data.desc}</p>
    </motion.div>
  );
}

