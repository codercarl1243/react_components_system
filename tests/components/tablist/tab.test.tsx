/* global describe, expect, test, jest */
/**
 * These tests validate attributes, state-driven behavior (tabIndex, aria-selected),
 * className merging, children rendering, click handling, and prop forwarding.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Tab from '@/components/tablist/tab'
import { type TabProps } from '@/components/tablist/tablist.type'
import userEvent from '@testing-library/user-event'

const setup = (override: Partial<React.ComponentProps<typeof Tab>> = {}) => {
  const onClickMock = jest.fn?.()

  const defaultProps = {
    id: 'alpha',
    isSelected: false,
    onClick: onClickMock,
    children: 'Tab Label',
    className: 'extra-class',
    'data-trace': 'trace-1'
  } as TabProps

  const props = { ...defaultProps, ...override }
  const utils = render(<Tab {...props} />)
  const button = screen.getByRole('tab')
  return { ...utils, button, props }
}

describe('Tab', () => {
  test('renders a tab button with correct base attributes', () => {
    const { button } = setup({ id: 'foo', isSelected: false })
    expect(button).toHaveAttribute('role', 'tab')
    expect(button).toHaveAttribute('id', 'tab-foo')
    expect(button).toHaveAttribute('aria-controls', 'panel-foo')
    expect(button).toHaveAttribute('aria-selected', 'false')
  })

  test('sets aria-selected and tabIndex correctly when selected', () => {
    const { button } = setup({ id: 'x', isSelected: true })
    expect(button).toHaveAttribute('aria-selected', 'true')
    expect(button).toHaveAttribute('tabIndex', '0')
  })

  test('sets tabIndex to -1 when not selected', () => {
    const { button } = setup({ id: 'y', isSelected: false })
    expect(button).toHaveAttribute('tabIndex', '-1')
  })

  test('renders children content', () => {
    const label = 'Profile'
    setup({ children: label })
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  test('merges className with base class via clsx', () => {
    const { button } = setup({ className: 'custom' })
    const className = button.getAttribute('class') || ''
    expect(className).toMatch(/\btablist__header-tab\b/)
    expect(className).toMatch(/\bcustom\b/)
  })

  test('calls onClick when clicked', async () => {
    const onClick = jest.fn?.()
    const { button } = setup({ onClick })
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('forwards arbitrary props to the underlying button (e.g., data attributes)', () => {
    const { button } = setup({ id: 'z', 'data-qa': 'tab-z' } as any)
    expect(button).toHaveAttribute('data-qa', 'tab-z')
  })

  test('handles different id values and keeps id/control coupling in sync', () => {
    for (const id of ['1', 'settings', 'with-dash', 'UPPER', '123-abc']) {
      const { unmount } = render(<Tab id={id as any} isSelected={false}>X</Tab>)
      const el = screen.getByRole('tab')
      expect(el).toHaveAttribute('id', `tab-${id}`)
      expect(el).toHaveAttribute('aria-controls', `panel-${id}`)
      unmount()
    }
  })

  test('respects disabled prop when passed through props', () => {
    const { button } = setup({ disabled: true } as any)
    expect(button).toBeDisabled()
  })
})
