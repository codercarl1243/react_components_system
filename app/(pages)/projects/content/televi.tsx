import Link from "@/components/link";
import { Block } from "@/components/primitives";

export default function TeleviContent() {
  return (
    <Block paint="all" variant="neutral" variantAppearance="filled">
      <p>
        <strong>Televi (テレビ)</strong> — a lightweight Japanese IPTV viewer
        combining live streams with an automatically generated programme guide.
      </p>

      <p>I built Televi while trying to watch Japanese baseball from Australia.</p>

      <p>
        As of 2026 broadcast rights for NPB games are fragmented across
        services and regions, and many platforms do not offer subscriptions
        outside Japan.
      </p>

      <p>
        Televi started as a small experiment to explore how public IPTV
        datasets and programme guide data could be combined into a simple
        viewer.
      </p>

      <Link href="https://github.com/codercarl1243/japanTelevi">
        View code on GitHub
      </Link>
    </Block>
  )
}