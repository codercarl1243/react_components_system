// import TeleviContent from "@/app/(pages)/projects/content/televi";
import { Project } from "./projects.type";
import NihongoContent from "@/app/(pages)/projects/content/nihongo";


export const projects: Project[] = [
  // removed as the iptv provider has shut down and the project is no longer functional. Keeping the code here for reference in case I want to revive the project in the future.
  // {
  //   id: "televi",
  //   title: "Televi ( テレビ )",
  //   description:
  //     "A Next.js IPTV viewer that aggregates Japanese TV streams, caches EPG data, and plays HLS streams in the browser. Built to solve the challenge of watching Japanese baseball from overseas when official streaming services restrict international access.",
  //   slug: 'televi',
  //   status: "active",
  //   image: {
  //     src: "/images/projects/televi/main.webp",
  //     alt: "Screenshot of the Televi IPTV viewer showing Japanese TV channels"
  //   },
  //   content: () => <TeleviContent />,
  //   featured: true,
  //   github: "https://github.com/codercarl1243/japanTelevi",
  //   tech: [
  //     "Next.js",
  //     "TypeScript",
  //     "HLS.js",
  //     "Docker",
  //     "Server-side caching"
  //   ],
  //   createdAt: new Date("2026-02-01")
  // }
  {
    id: "nihongo",
    title: "Nihongo (日本語)",
    description:
      "A privacy-first desktop language tutor featuring real-time voice conversation, spaced repetition vocabulary tracking, and local AI inference via a Python sidecar — no audio or conversation data ever leaves the device.",
    slug: "nihongo",
    status: "active",
    // image: {
      // src: "/images/projects/nihongo/main.webp",
      // alt: "Screenshot of the Nihongo language tutor application"
    // },
    content: () => <NihongoContent />,
    featured: true,
    github: "https://github.com/codercarl1243/nihongo",
    tech: [
      "Rust",
      "Tauri",
      "React",
      "TypeScript",
      "Python",
      "SQLite"
    ],
    createdAt: new Date("2026-05-01")
  }
]