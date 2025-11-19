'use client';
import Button from '@/components/button'
import Heading from '@/components/heading';

export default function Buttons() {
  return (
    <>
      <Heading as={"h2"}>Button Components</Heading>
      <fieldset>
        <legend>Base Button</legend>
        <Button>click me</Button>
        <Button disabled>disabled</Button>
        <Button isLoading>loading</Button>

      </fieldset>
      <fieldset>
        <legend>Filled Button</legend>
        <Button data-style="filled">default</Button>
        <Button data-style="filled" disabled>disabled</Button>
        <Button data-style="filled" isLoading>filled</Button>

      </fieldset>

      <fieldset>
        <legend>outline Button</legend>
        <Button data-style="outlined">default</Button>
        <Button data-style="outlined" disabled>disabled</Button>
        <Button data-style="outlined" isLoading>filled</Button>
      </fieldset>
      <fieldset>
        <legend>Primary Button</legend>
        <Button data-variant="primary">default</Button>
        <Button data-style="outlined" data-variant="primary">outline</Button>
        <Button data-style="filled" data-variant="primary">filled</Button>
        <Button data-style="filled" data-variant="primary" isLoading>filled</Button>
      </fieldset>
      <fieldset>
        <legend>Secondary Button</legend>
        <Button data-variant="secondary">default</Button>
        <Button data-style="outlined" data-variant="secondary">outline</Button>
        <Button data-style="filled" data-variant="secondary">filled</Button>
        <Button data-style="filled" data-variant="secondary" isLoading>loading</Button>
      </fieldset>
      <fieldset style={{ display: "flex" }}>
        <legend>Accent Button</legend>
        <Button data-variant="accent">default</Button>
        <Button data-style="outlined" data-variant="accent">outline</Button>
        <Button data-style="filled" data-variant="accent">filled</Button>
        <Button data-style="outlined" data-variant="accent" isLoading>loading</Button>
      </fieldset>
    </>
  )
}
