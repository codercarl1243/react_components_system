import Button from '@/components/button'

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
    </>
  )
}
