import { Project } from "./projects.type";


export const projects: Project[] = [
  {
    id: "televi",
    title: "Televi",
    description:
      "A Next.js IPTV viewer that aggregates Japanese TV streams, caches EPG data, and plays HLS streams in the browser. Built to solve the challenge of watching Japanese baseball from overseas when official streaming services restrict international access.",
    content: `<p><strong>Televi ( テレビ )</strong> — a lightweight Japanese IPTV viewer combining live streams with an automatically generated programme guide.</p>
              <Link href="https://github.com/codercarl1243/japanTelevi" rel="noopener noreferrer">View project</Link>
              <p>I built Televi ( テレビ ) while trying to watch Japanese baseball from Australia.</p>

              <p>
                  As of 2026 Broadcast rights for NPB games are fragmented across different
                  services and regions, and many platforms do not offer subscriptions
                  outside Japan.
              </p>

              <p>
                  Televi ( テレビ ) started as a small experiment to explore how public IPTV
                  datasets and programme guide data could be combined into a simple
                  viewer.
              </p>`,
    image: {
      src: "/images/projects/televi/main.webp",
      alt: "Screenshot of the Televi IPTV viewer showing Japanese TV channels"
    },
    slug: 'televi',
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