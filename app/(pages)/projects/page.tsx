import Heading from "@/components/heading";
import Link from "@/components/link";
import { Block, Stack } from "@/components/primitives";
import Tablist from "@/components/tablist";

// WIP
export default function ProjectsPage() {


    return (
        <div className="layout-wrapper flow-8 projects-page">
            <Stack
                as="section"
            >
                <Heading as="h1" headingSize={2}>Projects</Heading>
            </Stack>

            <Stack>
                <Tablist 
                defaultActiveTabId="televi"
                tabListName={"projects"} 
                orientation="horizontal"
                tabs={[{
                    id: "televi",
                    tabLabel: "Televi ( テレビ )",
                    panelContent: (
                      <Block paint="all" variant="neutral" variantAppearance="filled">
                             <p><strong>Televi ( テレビ )</strong> — a lightweight Japanese IPTV viewer combining live streams with an automatically generated programme guide.</p>
                            
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
                            </p>
                            <Link href="https://github.com/codercarl1243/japanTelevi" rel="noopener noreferrer">View code on Github</Link>
                        </Block>
                    )
                },
            {
                    id: "televi2",
                    tabLabel: "project 2",
                    panelContent: (
                        <div>
                             <p>content 2</p>
                        </div>
                    )
                }]} 
                variant={"neutral"}                
                />
            </Stack>
        </div>
    )
}