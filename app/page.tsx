'use client';
import Button from '@/components/button'
import Link from '@/components/link'
import TabList from '@/components/tablist'

export default function Home() {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>React Components</h1>
      <fieldset>
        <legend>Base Button</legend>
        <Button>click me</Button>
        <Button disabled>disabled button</Button>
        <Button isLoading></Button>

      </fieldset>
      <fieldset>
        <legend>Filled Button</legend>
        <Button data-style="filled">filled button</Button>
        <Button data-style="filled" disabled>disabled button</Button>
        <Button data-style="filled" isLoading>filled button</Button>

      </fieldset>

      <fieldset>
        <legend>outline Button</legend>
        <Button data-style="outlined">outline button</Button>
        <Button data-style="outlined" disabled>outline button</Button>
        <Button data-style="outlined" isLoading>outline button</Button>
      </fieldset>
      <fieldset>
        <legend>Primary Button</legend>
        <Button data-style="outlined" data-variant="primary">outline button</Button>
        <Button data-style="filled" data-variant="primary">filled button</Button>
        <Button data-style="filled" data-variant="primary" isLoading>loading</Button>
      </fieldset>
      <fieldset>
        <legend>Secondary Button</legend>
        <Button data-style="outlined" data-variant="secondary">outline button</Button>
        <Button data-style="filled" data-variant="secondary">filled button</Button>
        <Button data-style="filled" data-variant="secondary" isLoading>loading</Button>
      </fieldset>
      <fieldset style={{ display: "flex" }}>
        <legend>Accent Button</legend>
        <Button data-style="outlined" data-variant="accent">click</Button>
        <Button data-style="outlined" data-variant="accent" isLoading>click</Button>
        <Button data-style="outlined" data-variant="accent" disabled>click</Button>
        {/*         
        <Button data-style="filled" data-variant="accent">filled button</Button>
        <Button data-style="filled" data-variant="accent" isLoading>loading</Button> */}
      </fieldset>

      <TabList
        defaultActiveTabId="panel1"
        orientation="horizontal"
        tabs={[
          {
            id: 'panel1',
            tabLabel: 'coding',
            panelContent: (
              <Link href="/categories/coding">
                show all of the posts to do with coding
              </Link>
            )
          },
          {
            id: 'panel2',
            tabLabel: 'accessibility',
            panelContent: (
              <Link href="/categories/accessibility">
                show all of the posts to do with accessibility
              </Link>
            )
          },
          {
            id: 'panel3',
            tabLabel: 'design-system',
            panelContent: (
              <Link href="/categories/design-systems">
                show all of the posts to do with design systems
              </Link>
            )
          }
        ]}
      />
    </>
  )
}
