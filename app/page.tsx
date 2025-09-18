import Button from '@/components/button'
import Link from '@/components/link'
import TabList from '@/components/tablist'

export default function Home () {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>React Components</h1>
      <fieldset>
        <legend>Base Button</legend>
        <Button>click me</Button>
        <Button disabled>disabled button</Button>
      </fieldset>
      <fieldset>
        <legend>Filled Button</legend>
        <Button data-style="filled">filled button</Button>
        <Button data-style="filled" disabled>disabled button</Button>
      </fieldset>

      <fieldset>
        <legend>outline Button</legend>
        <Button data-style="outline">outline button</Button>
        <Button data-style="outline" disabled>disabled button</Button>
      </fieldset>
      <fieldset>
        <legend>Primary Button</legend>
        <Button data-style="outline" data-variant="primary">outline button</Button>
        <Button data-style="outline" data-variant="primary" disabled>outline button</Button>
        <Button data-style="outline" data-variant="primary" isLoading>outline button</Button>
        <Button data-style="filled" data-variant="primary">filled button</Button>
        <Button data-style="filled" data-variant="primary" disabled>filled button</Button>
        <Button data-style="filled" data-variant="primary" isLoading>filled button</Button>
      </fieldset>
      <fieldset>
        <legend>Secondary Button</legend>
        <Button data-style="outline" data-variant="secondary">outline button</Button>
        <Button data-style="outline" data-variant="secondary" disabled>outline button</Button>
        <Button data-style="outline" data-variant="secondary" isLoading>outline button</Button>
        <Button data-style="filled" data-variant="secondary">filled button</Button>
        <Button data-style="filled" data-variant="secondary" disabled>filled button</Button>
        <Button data-style="filled" data-variant="secondary" isLoading>filled button</Button>
      </fieldset>
            <fieldset>
        <legend>Accent Button</legend>
        <Button data-style="outline" data-variant="accent">outline button</Button>
        <Button data-style="outline" data-variant="accent" disabled>outline button</Button>
        <Button data-style="outline" data-variant="accent" isLoading>outline button</Button>
        <Button data-style="filled" data-variant="accent">filled button</Button>
        <Button data-style="filled" data-variant="accent" disabled>filled button</Button>
        <Button data-style="filled" data-variant="accent" isLoading>filled button</Button>
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
