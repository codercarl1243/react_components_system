'use client';
import Button from '@/components/button'
import Heading from '@/components/heading';
import { Inline, Stack } from '@/components/primitives';

export default function Buttons() {
  return (
    <>
      <Heading as={"h2"}>Button Components</Heading>

      <Stack as="fieldset">
        <legend>Base Button</legend>
        <Inline>
          <Button>default</Button>
          <Button variant='neutral'>neutral</Button>
          <Button variant='muted'>muted</Button>
          <Button variant='info'>info</Button>
          <Button variant='success'>success</Button>
          <Button variant='danger'>danger</Button>
          <Button variant='warning'>warning</Button>
          <Button variant='primary'>primary</Button>
          <Button variant='secondary'>secondary</Button>
          <Button variant='accent'>accent</Button>
          <Button disabled>disabled</Button>
          <Button isLoading>filled</Button>
        </Inline>
      </Stack>



      <Stack as="fieldset">
        <legend>Filled Button</legend>
        <Inline>
          <Button variantAppearance="filled">default</Button>
          <Button variantAppearance="filled" variant='neutral'>neutral</Button>
          <Button variantAppearance="filled" variant='muted'>muted</Button>
          <Button variantAppearance="filled" variant='info'>info</Button>
          <Button variantAppearance="filled" variant='success'>success</Button>
          <Button variantAppearance="filled" variant='danger'>danger</Button>
          <Button variantAppearance="filled" variant='warning'>warning</Button>
          <Button variantAppearance="filled" variant='primary'>primary</Button>
          <Button variantAppearance="filled" variant='secondary'>secondary</Button>
          <Button variantAppearance="filled" variant='accent'>accent</Button>
          <Button variantAppearance="filled" disabled>disabled</Button>
          <Button variantAppearance="filled" isLoading>filled</Button>
        </Inline>
      </Stack>

      <Stack as="fieldset">
        <legend>Outlined Button</legend>
        <Inline>
          <Button variantAppearance="outlined">default</Button>
          <Button variantAppearance="outlined" variant='neutral'>neutral</Button>
          <Button variantAppearance="outlined" variant='muted'>muted</Button>
          <Button variantAppearance="outlined" variant='info'>info</Button>
          <Button variantAppearance="outlined" variant='success'>success</Button>
          <Button variantAppearance="outlined" variant='danger'>danger</Button>
          <Button variantAppearance="outlined" variant='warning'>warning</Button>
          <Button variantAppearance="outlined" variant='primary'>primary</Button>
          <Button variantAppearance="outlined" variant='secondary'>secondary</Button>
          <Button variantAppearance="outlined" variant='accent'>accent</Button>
          <Button variantAppearance="outlined" disabled>disabled</Button>
          <Button variantAppearance="outlined" isLoading>filled</Button>
        </Inline>
      </Stack>

      <Stack as="fieldset">
        <legend>Ghost Button</legend>
        <Inline>
          <Button variantAppearance="ghost">default</Button>
          <Button variantAppearance="ghost" variant='neutral'>neutral</Button>
          <Button variantAppearance="ghost" variant='muted'>muted</Button>
          <Button variantAppearance="ghost" variant='info'>info</Button>
          <Button variantAppearance="ghost" variant='success'>success</Button>
          <Button variantAppearance="ghost" variant='danger'>danger</Button>
          <Button variantAppearance="ghost" variant='warning'>warning</Button>
          <Button variantAppearance="ghost" variant='primary'>primary</Button>
          <Button variantAppearance="ghost" variant='secondary'>secondary</Button>
          <Button variantAppearance="ghost" variant='accent'>accent</Button>
          <Button variantAppearance="ghost" disabled>disabled</Button>
          <Button variantAppearance="ghost" isLoading>filled</Button>
        </Inline>
      </Stack>

      {/* <fieldset>
        <legend>outline Button</legend>
        <Button variantAppearance="outlined">default</Button>
        <Button variantAppearance="outlined" disabled>disabled</Button>
        <Button variantAppearance="outlined" isLoading>filled</Button>
      </fieldset>
      <fieldset>
        <legend>Primary Button</legend>
        <Button variant="primary">default</Button>
        <Button variantAppearance="outlined" variant="primary">outline</Button>
        <Button variantAppearance="filled" variant="primary">filled</Button>
        <Button variantAppearance="filled" variant="primary" isLoading>filled</Button>
      </fieldset>
      <fieldset>
        <legend>Secondary Button</legend>
        <Button variant="secondary">default</Button>
        <Button variantAppearance="outlined" variant="secondary">outline</Button>
        <Button variantAppearance="filled" variant="secondary">filled</Button>
        <Button variantAppearance="filled" variant="secondary" isLoading>loading</Button>
      </fieldset>
      <fieldset style={{ display: "flex" }}>
        <legend>Accent Button</legend>
        <Button variant="accent">default</Button>
        <Button variantAppearance="outlined" variant="accent">outline</Button>
        <Button variantAppearance="filled" variant="accent">filled</Button>
        <Button variantAppearance="outlined" variant="accent" isLoading>loading</Button>
      </fieldset> */}
    </>
  )
}
