import Heading from "@/components/heading";
import List from "@/components/list";
import { Stack } from "@/components/primitives";


export default function AboutPage() {


    return (
        <div className="layout-wrapper flow-8">
            <Stack
                as="section">
                <Heading as="h1" headingSize={2}>About Me</Heading>
                <p>
                    I am a Full stack developer with a strong focus on <span className="fun-underline">front-end architecture</span>, <span className="fun-underline">accessibility</span>, and just <span className="fun-underline">building enjoyable user experiences</span>.
                </p>
                <p>
                    I specialise in building systems that are easier to understand, maintain, and remain reliable over time. This often means defining clear boundaries and improving how UI and logic evolve together.
                </p>
            </Stack>
            <Stack
                as="section"
                variant="primary"
                variantAppearance="tonal"
                paint={"surface"}
                className="surface-frame p-4"
            >
                <Heading as="h2" headingSize={4} variant="primary" className="mt-0">Professional focus</Heading>

                <p>
                    I work across both frontend and backend, contributing to features end-to-end
                    — from user interface and accessibility through to APIs and data.
                </p>

                <List as="ul" marker="circle">
                    <li>Frontend: React, HTML, CSS/SCSS</li>
                    <li>Backend: Node.js, AWS Lambda, DynamoDB, MySQL</li>
                    <li>Quality & delivery: accessibility, testing, and maintainable systems</li>
                </List>
            </Stack>

            <Stack
                as="section"
                variant="secondary"
                variantAppearance="tonal"
                paint={"surface"}
                className="surface-frame p-4"
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
                    <li>React, Remix, Prisma</li>
                    <li>Sourdough (because not everything has to be digital)</li>
                </List>
            </Stack>

            <Stack
                as="section"
                variant="accent"
                variantAppearance="tonal"
                paint={"surface"}
                className="surface-frame p-4"
            >
                <Heading as="h2" headingSize={4} variant="accent" className="mt-0">
                    Technologies & tools
                </Heading>

                <List as="ul" marker="circle">
                    <li>Languages: JavaScript, TypeScript, HTML, CSS, SCSS</li>
                    <li>Databases: MySQL, PostgreSQL, MongoDB, Prisma</li>
                    <li>Frameworks: React, Node, Remix</li>
                    <li>Content platforms: WordPress, Sanity.io, Google Sites</li>
                    <li>Tools: Git, Linux, Figma, AWS, accessibility testing tools</li>
                    <li>Testing: Jest, Cypress, Storybook</li>
                </List>
            </Stack>
        </div>
    )
}