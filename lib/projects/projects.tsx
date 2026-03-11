import TeleviContent from "@/app/(pages)/projects/content/televi";
import { Project } from "./projects.type";


export const projects: Project[] = [
  {
    id: "televi",
    title: "Televi ( テレビ )",
    description:
      "A Next.js IPTV viewer that aggregates Japanese TV streams, caches EPG data, and plays HLS streams in the browser. Built to solve the challenge of watching Japanese baseball from overseas when official streaming services restrict international access.",
    slug: 'televi',
    status: "active",
    image: {
      src: "/images/projects/televi/main.webp",
      alt: "Screenshot of the Televi IPTV viewer showing Japanese TV channels"
    },
    content: () => <TeleviContent />,
    featured: true,
    github: "https://github.com/codercarl1243/japanTelevi",
    tech: [
      "Next.js",
      "TypeScript",
      "HLS.js",
      "Docker",
      "Server-side caching"
    ],
    createdAt: new Date("2026-02-01")
  }
]