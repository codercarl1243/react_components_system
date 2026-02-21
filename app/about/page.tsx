import Heading from "@/components/heading";
import List from "@/components/list";
import { Inline, Row, Stack } from "@/components/primitives";
import Image from '@/components/image'

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
                            specialising in <span className="fun-underline">system-driven UI architecture</span>,
                            <span className="fun-underline">accessibility</span>, and building
                            <span className="fun-underline">thoughtful user experiences</span>.
                        </p>
                        <p>
                            Alongside building systems, I write about them — breaking down patterns,
                            trade-offs, and implementation details so others can apply them in practice.
                        </p>
                    </Stack>
                </div>
            </Stack>
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
                    Learning & personal projects
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
        </div>
    )
}