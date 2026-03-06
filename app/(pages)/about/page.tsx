import Heading from "@/components/heading";
import List from "@/components/list";
import { Stack } from "@/components/primitives";
import Image from '@/components/image'
import Link from "@/components/link";
import Icon from "@/components/icon";
import { RiJavaFill } from "@remixicon/react";
import ContactForm from "@/components/contact_form";
import ContactLinks from "./contactLinks";
import BuyMeACoffeeCTA from "@/components/buyMeACoffeeCTA";

export default function AboutPage() {

    return (
        <div className="layout-wrapper flow-8 about-page">
            <Stack
                as="section"
            >
                <Heading as="h1" headingSize={2}>About Me</Heading>
                <div className="about-page__intro pb-8">
                    <Image alt="" src="/images/carl_portrait.webp" height={250} width={200} variant="card" className="about-page__intro--portrait" />
                    <Stack className="about-page__intro--text" gap={8}>
                        <p>
                            I'm a frontend-focused engineer with production experience in complex systems,
                            specialising in <span className="fun-underline">system-driven</span> UI architecture,{" "}
                            <span className="fun-underline">accessibility</span>, and building{" "}
                            <span className="fun-underline">thoughtful user experiences</span>.
                        </p>
                        <p>
                            Alongside building systems, I write about them — breaking down patterns,
                            trade-offs, and implementation details so others can apply them in practice.
                            Some of the experiments and tools I build are also shared openly on this site.
                        </p>
                    </Stack>
                </div>
            </Stack>

            {/* <Stack>
                <Heading as="h2" headingSize={4} >Projects</Heading>

                <List marker="none">
                    <li>
                        <Stack variant="neutral" className="surface-frame p-4" variantAppearance="filled" paint={"all"}>
                            <p><strong>Televi ( テレビ )</strong> — a lightweight Japanese IPTV viewer combining live streams with an automatically generated programme guide.</p>
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
                            </p>
                        </Stack>
                    </li>
                </List>
            </Stack> */}
            <Stack
                as="section"
                variant="primary"
                variantAppearance="tonal"
                paint="all"
                className="surface-frame p-8 pb-16"
            >
                <Heading as="h2" headingSize={4} variant="primary" className="mt-0">Professional focus</Heading>
                <p>
                    I design and build frontend systems that are accessible, composable, and easy to reason about — while supporting them with well-structured APIs and data models.
                </p>
                <List as="ul" marker="circle">
                    <li>Frontend: React, TypeScript, design systems, and accessible component architecture</li>
                    <li>Supporting backend: Node.js (TypeScript), API design, and data modeling</li>
                    <li>Approach: clear boundaries, strong typing, and maintainable abstractions</li>
                </List>
            </Stack>

            <Stack
                as="section"
                variant="secondary"
                variantAppearance="tonal"
                paint="all"
                className="surface-frame p-8 pb-16"
            >
                <Heading as="h2" headingSize={4} variant="secondary" className="mt-0">
                    Learning & Professional development
                </Heading>

                <p>
                    Outside of work, I like improving how I build things — especially in
                    areas that make software more usable and more sustainable.
                </p>

                <List as="ul" marker="circle">
                    <li>Accessibility best practices (WCAG, ARIA, and internal yelling at bad contrast ratios)</li>
                    <li>Design systems and component architecture</li>
                    <li>Exploring React, Remix, and Prisma</li>
                    <li>Sourdough (because not everything compiles the same way)</li>
                </List>
            </Stack>
            <Stack
                as="section"
                variant="inverse"
                variantAppearance="outlined"
                paint="border"
                className="surface-frame p-8"
                gap={16}
            >
                <Heading as="h2" headingSize={4} variant="warning" className="mt-0">
                    Support my work
                </Heading>

                <p>
                    If something I've built or written has been useful to you, you can support
                    further development by buying me a coffee. Every contribution helps me
                    carve out more time for open source projects and writing.
                </p>
                <BuyMeACoffeeCTA className="mx-auto" />

            </Stack>
            <Stack
                as="section"
                variant="accent"
                variantAppearance="tonal"
                paint="all"
                className="surface-frame p-8 pb-16"
            >
                <Heading as="h2" headingSize={4} variant="accent" className="mt-0">
                    Technologies & tools
                </Heading>

                <List as="ul" marker="circle">
                    <li>Languages: TypeScript, JavaScript, HTML, CSS/SCSS</li>
                    <li>Frontend: React, design systems, component libraries</li>
                    <li>Backend: Node.js, API design</li>
                    <li>Data: MySQL, PostgreSQL, MongoDB, Prisma</li>
                    <li>Testing: Jest, Cypress, Storybook</li>
                    <li>Tools: Git, Linux, Figma, accessibility testing tools</li>
                </List>
            </Stack>
            <Stack
                as="section"
                variant="muted"
                variantAppearance="outlined"
                paint="all"
                className="about-contact surface-frame p-8 frame-inset-8 divider-wrapper"
                gap={16}
            >
                <Heading as="h2" headingSize={4} variant="inverse" className="center">
                    Get in touch
                </Heading>
                <ContactLinks />
                <p className="divider-w-text" data-subtle="true">
                    <span className="divider__content">or send a message</span>
                </p>
                <ContactForm />
            </Stack>
        </div>
    )
}