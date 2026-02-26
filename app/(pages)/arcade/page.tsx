import Link from "next/link";
import { gamesRegistry } from "./gamesRegistry";

export default function ArcadeHubPage() {
  return (
    <div className="layout-wrapper">
      <h1>Arcade</h1>
      <ul>
        {Object.values(gamesRegistry).map(({ config }) => (
          <li key={config.id}>
            <Link href={`/arcade/${config.id}`}>{config.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}