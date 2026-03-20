import Heading from "@/components/heading";
import List from "@/components/list";
import { Stack } from "@/components/primitives";
import Image from '@/components/image'
import Link from "@/components/link";
import ContactForm from "@/components/contact_form";
import ContactLinks from "./contactLinks";
import BuyMeACoffeeCTA from "@/components/buyMeACoffeeCTA";

export default function AboutPage() {

    return (
        <div className="layout-wrapper flow-xl about-page">
            <Stack
                as="section"
            >
                <Heading as="h1" headingSize={2}>About Me</Heading>
                <div className="about-page__intro pb-lg">
                    <Image alt="" src="/images/carl_portrait.webp" height={250} width={200} variant="card" className="about-page__intro--portrait" />
                    <Stack className="about-page__intro--text" gap={"lg"}>
                        <p>
                            I'm a frontend-focused engineer with production experience in complex systems,
                            specialising in system-driven <span className="fun-underline">UI architecture</span>,{" "}
                            <span className="fun-underline">accessibility</span>, and thoughtful{" "}
                            <span className="fun-underline">user experiences</span>.
                        </p>
                        <p>
                            Alongside building systems, I write about them — breaking down patterns,
                            trade-offs, and implementation details so others can apply them in practice.
                        </p>
                        <p>
                             If you'd like to see what I've been working on lately, take a look at the{" "}
                            <Link href="/projects">projects page</Link>.
                        </p>
                    </Stack>
                </div>
            </Stack>
            <Stack
                as="section"
                variant="primary"
                variantAppearance="tonal"
                paint="all"
                className="surface-frame p-lg pb-2xl"
            >
                <Heading as="h2" headingSize={4} variant="primary" className="mt-0">Professional focus</Heading>
                <p>
                    I design and build frontend systems that are accessible, composable, and easy to reason about — while supporting them with well-structured APIs and data models.
                </p>
                <List as="ul" marker="circle">
                    <li><span className="bold">Frontend:</span> React, TypeScript, design systems, and accessible component architecture</li>
                    <li><span className="bold">Supporting backend:</span> Node.js (TypeScript), API design, and data modeling</li>
                    <li><span className="bold">Approach:</span> clear boundaries, strong typing, and maintainable abstractions</li>
                </List>
            </Stack>

            <Stack
                as="section"
                variant="secondary"
                variantAppearance="tonal"
                paint="all"
                className="surface-frame p-lg pb-2xl"
            >
                <Heading as="h2" headingSize={4} variant="secondary" className="mt-0">
                    Learning & Professional development
                </Heading>

                <p>
                    Outside of work, I like improving how I build things — especially in
                    areas that make software more usable and more sustainable.
                </p>

                <List as="ul" marker="circle" variant="primary">
                    <li>Accessibility best practices (WCAG, ARIA, and internal yelling at bad contrast ratios)</li>
                    <li>Design systems and component architecture</li>
                    <li>Exploring React, Remix, and Prisma</li>
                    <li>Sourdough (because not everything compiles the same way)</li>
                </List>
            </Stack>
            <Stack
                as="section"
                variant="accent"
                variantAppearance="tonal"
                paint="all"
                className="surface-frame p-lg pb-2xl"
            >
                <Heading as="h2" headingSize={4} variant="accent" className="mt-0">
                    Technologies & tools
                </Heading>

                <List as="ul" marker="circle">
                    <li><span className="bold">Languages:</span> TypeScript, JavaScript, HTML, CSS/SCSS</li>
                    <li><span className="bold">Frontend:</span> React, design systems, component libraries</li>
                    <li><span className="bold">Backend:</span> Node.js, API design</li>
                    <li><span className="bold">Data:</span> MySQL, PostgreSQL, MongoDB, Prisma</li>
                    <li><span className="bold">Testing:</span> Jest, Cypress, Storybook</li>
                    <li><span className="bold">Tools:</span> Git, Linux, Figma, accessibility testing tools</li>
                </List>
            </Stack>
            <Stack
                as="section"
                variant="light"
                variantAppearance="filled"
                paint="all"
                className="surface-frame p-lg pb-2xl"
            >
                <Heading as="h2" headingSize={4} variant="warning" className="mt-0">
                    Support my work
                </Heading>
                <Stack gap={"sm"}>
                    <p>
                        If something I've built or written has been useful to you, you can support
                        further development by buying me a coffee.
                    </p>
                    <p>
                        Contributions help me dedicate more time to open source projects and writing.
                    </p>
                </Stack>
                <BuyMeACoffeeCTA className="mx-auto contact-link--external contact-link" />
            </Stack>
            <Stack
                as="section"
                className="about-contact p-lg divider-wrapper"
                gap={"2xl"}
            >
                <Heading as="h2" headingSize={3} variant="inverse" className="center">
                    Get in touch
                </Heading>
                <ContactLinks />
                <p className="divider" data-subtle="true">
                    <span className="divider__content">or send a message</span>
                </p>
                <ContactForm />
            </Stack>
        </div>
    )
}