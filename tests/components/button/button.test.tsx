import Button from '@/components/button'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

describe('Button', () => {
  test('renders with children', () => {
    render(<Button>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveTextContent('click me')
  })

  test('renders with icon when icon prop is provided', () => {
    render(<Button icon="home">click me</Button>)
    const button = screen.getByTestId('base-button')
    expect(button).toHaveClass('button-w-icon')
    expect(button).toHaveTextContent('click me')
  })

  test('renders spinner when isLoading prop is true', () => {
    render(<Button isLoading>click me</Button>)
    const button = screen.getByTestId('base-button')
    expect(button).toHaveAttribute('data-loading', 'true')
    expect(button.querySelector('[data-testid*="spinner"]')).toBeInTheDocument()
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>click me</Button>)
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('prevents click handler when disabled', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>click me</Button>)
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('prevents click handler when isLoading is true', () => {
    const handleClick = jest.fn()
    render(<Button isLoading onClick={handleClick}>click me</Button>)
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('stops propagation when disabled', () => {
    const handleParentClick = jest.fn()
    render(
      <div onClick={handleParentClick}>
        <Button disabled onClick={jest.fn()}>click me</Button>
      </div>
    )
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleParentClick).not.toHaveBeenCalled()
  })

  test('stops propagation when loading', () => {
    const handleParentClick = jest.fn()
    render(
      <div onClick={handleParentClick}>
        <Button isLoading onClick={jest.fn()}>click me</Button>
      </div>
    )
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleParentClick).not.toHaveBeenCalled()
  })

  test('sets type to button by default to prevent form submission', () => {
    render(<Button>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('type', 'button')
  })

  test('allows type to be overridden to submit', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault())
    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">submit</Button>
      </form>
    )
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  test('prevents form submission when disabled', () => {
    const handleSubmit = jest.fn()
    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit" disabled>submit</Button>
      </form>
    )
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  test('forwards ref to the HTML button element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref} id="ref_test">click me</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveAttribute('id', 'ref_test')
  })

  test('sets aria-disabled when disabled', () => {
    render(<Button disabled>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('aria-disabled', 'true')
  })

  test('sets aria-disabled when loading', () => {
    render(<Button isLoading>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('aria-disabled', 'true')
  })

  test('sets data-loading attribute when loading', () => {
    render(<Button isLoading>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('data-loading', 'true')
  })

  test('applies data-style prop', () => {
    render(<Button data-style="filled">click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('data-style', 'filled')
  })

  test('applies data-variant prop', () => {
    render(<Button data-variant="primary">click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('data-variant', 'primary')
  })

  test('applies custom className', () => {
    render(<Button className="custom-class">click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveClass('custom-class', 'button')
  })

  test('is keyboard accessible', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>click me</Button>)
    const button = screen.getByTestId('base-button')
    button.focus()
    expect(button).toHaveFocus()
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  })

  test('handles async click handlers', async () => {
    const handleClick = jest.fn().mockResolvedValue(undefined)
    render(<Button onClick={handleClick}>click me</Button>)
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
    await expect(handleClick.mock.results[0].value).resolves.toBeUndefined()
  })
})