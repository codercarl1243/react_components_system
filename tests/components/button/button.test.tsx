/* global describe, expect, test, jest */
import Button from '@/components/button'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

describe('Base Button', () => {
  test('renders with children', () => {
    render(<Button>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveTextContent('click me')
  })
  test('renders Loading when isLoading prop is true', () => {
    render(<Button isLoading>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveTextContent('Loading')
  })
  test('calls onClick handler when is clicked', () => {
    const handleclickFn = jest.fn()
    render(<Button onClick={handleclickFn}>click me</Button>)
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleclickFn).toHaveBeenCalledTimes(1)
  })
  test('sets the type to button to prevent form submission by default', () => {
    // expand on this test and render out a form and ensure that there is no event being fired by the form.
    render(<Button>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('type', 'button')
  })
  test('forwards the ref to the html element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref} id="ref_test">click me</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveAttribute('id', 'ref_test')
  })
  test('passes through disabled states', () => {
    const { rerender } = render(<Button disabled={true}>click me</Button>)

    expect(screen.getByTestId('base-button')).toBeDisabled()

    rerender(<Button disabled={false}>click me</Button>)
    expect(screen.getByTestId('base-button')).not.toBeDisabled()
  })
  test('sets aria-busy to true when loading', () => {
    render(<Button isLoading={true}>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('aria-busy', 'true')
  })
})
