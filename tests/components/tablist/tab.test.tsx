import { createRef, type ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import Tab from '@/components/tablist/tab'
import userEvent from '@testing-library/user-event'

const setup = (override: Partial<ComponentProps<typeof Tab>> = {}) => {
  const onClickMock = jest.fn()

  const defaultProps: ComponentProps<typeof Tab> = {
    id: 'alpha',
    isSelected: false,
    onClick: onClickMock,
    children: 'Tab Label',
  }

  const props = { ...defaultProps, ...override }
  const utils = render(<Tab {...props} />)
  const button = screen.getByRole('tab')
  return { ...utils, button, props, onClickMock }
}

describe('Tab Component', () => {
  it('renders with all Tab-specific props correctly', async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLButtonElement>()
    const onClickMock = jest.fn()
    
    const { button } = setup({
      id: 'test-tab',
      isSelected: true,
      onClick: onClickMock,
      className: 'custom-class',
      ref,
      children: 'Test Tab Content'
    })

    // Test id prop - should be prefixed with 'tab-'
    expect(button).toHaveAttribute('id', 'tab-test-tab')
    
    // Test isSelected prop - affects aria-selected and tabIndex
    expect(button).toHaveAttribute('aria-selected', 'true')
    expect(button).toHaveAttribute('tabindex', '0')
    
    // Test className prop - should be merged with default class
    expect(button).toHaveClass('tablist__header-tab', 'custom-class')
    
    // Test children prop
    expect(button).toHaveTextContent('Test Tab Content')
    
    // Test ref prop
    expect(ref.current).toBe(button)
    
    // Test onClick prop
    await user.click(button)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('renders unselected tab with correct attributes', () => {
    const { button } = setup({
      id: 'unselected-tab',
      isSelected: false
    })

    expect(button).toHaveAttribute('id', 'tab-unselected-tab')
    expect(button).toHaveAttribute('aria-selected', 'false')
    expect(button).toHaveAttribute('tabindex', '-1')
  })

  it('generates correct aria-controls attribute based on id', () => {
    const { button } = setup({
      id: 'panel-identifier'
    })

    expect(button).toHaveAttribute('aria-controls', 'panel-panel-identifier')
  })
})