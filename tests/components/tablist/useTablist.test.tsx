/* eslint-env jest */

import React, { useEffect, useImperativeHandle, forwardRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useTablist from '@/components/tablist/useTablist'

// Cross-framework mock helpers: prefer vi.* if available, else fall back to jest.*
const mockFn = (globalThis as any).jest?.fn
const doMock = (globalThis as any).jest?.mock

// Mock "@/utils/keyboardHandlers" so key callbacks actually execute in tests

if (doMock && mockFn) {
  const handleKeyPressMock = mockFn((e: KeyboardEvent | any, map: Record<string, () => void>) => {
    const key = (e.key ?? e.code ?? '').toString()
    if (key in map) {
      map[key]!()
    }
  })

  doMock('../../../utils/keyboardHandlers', () => ({
    handleKeyPress: (e: KeyboardEvent | any, map: Record<string, () => void>) =>
      handleKeyPressMock(e, map)
  }))
}

// Helper test component that uses the hook and renders a minimal tablist+panels structure
type TestTabsProps = {
  ids: string[];
  orientation?: 'horizontal' | 'vertical';
  defaultTabId?: string;
  // When set, effect will override active tab after mount
  overrideActiveId?: string;
};

// Expose imperative methods for some tests
type TestHandle = {
  getActive: () => string | undefined;
};

const TestTabs = forwardRef<TestHandle, TestTabsProps>(function TestTabs (
  { ids, orientation = 'horizontal', defaultTabId, overrideActiveId },
  ref
) {
  const { activeId, setActiveTab, tablistRef, handleKeyDown } = useTablist(defaultTabId)

  useEffect(() => {
    if (overrideActiveId !== undefined) {
      setActiveTab(overrideActiveId)
    }
  }, [overrideActiveId, setActiveTab])

  useImperativeHandle(ref, () => ({
    getActive: () => activeId
  }))

  return (
    <div>
      <div
        role="tablist"
        aria-orientation={orientation}
        ref={tablistRef}
        onKeyDown={handleKeyDown as any}
        aria-label="test-tablist"
        data-active-id={activeId ?? ''}
      >
        {ids.map((id) => (
          <button
            key={id}
            id={`tab-${id}`}
            role="tab"
            aria-controls={`panel-${id}`}
            aria-selected={activeId === id}
          >
            Tab {id}
          </button>
        ))}
      </div>
      {/* Panels must be focusable for Enter/Space behavior */}
      {ids.map((id) => (
        <div key={id} id={`panel-${id}`} role="tabpanel" tabIndex={-1}>
          Panel {id}
        </div>
      ))}
      {/* Visualization of activeId for assertions */}
      <span data-testid="active-id">{activeId ?? ''}</span>
    </div>
  )
})

describe('useTablist - initialization', () => {
  it('uses provided defaultTabId when present', () => {
    render(<TestTabs ids={['alpha', 'beta', 'gamma']} defaultTabId="beta" />)
    expect(screen.getByTestId('active-id').textContent).toBe('beta')
  })

  it('falls back to first tab id when defaultTabId is not provided', () => {
    render(<TestTabs ids={['alpha', 'beta', 'gamma']} />)
    expect(screen.getByTestId('active-id').textContent).toBe('alpha')
  })

  it('remains undefined when there are no tabs', () => {
    render(<TestTabs ids={[]} />)
    expect(screen.getByTestId('active-id').textContent).toBe('')
  })
})

describe('useTablist - horizontal keyboard navigation', () => {
  it('ArrowRight moves focus to next tab and wraps at end', async () => {
    const user = userEvent.setup()
    render(<TestTabs ids={['a', 'b', 'c']} defaultTabId="a" orientation="horizontal" />)
    const [tabA, tabB, tabC] = ['a', 'b', 'c'].map((id) => screen.getByRole('tab', { name: `Tab ${id}` }));

    // Start focused on A
    (tabA as HTMLButtonElement).focus()
    expect(document.activeElement).toBe(tabA)

    // Right -> B
    await user.keyboard('{ArrowRight}')
    expect(screen.getByTestId('active-id').textContent).toBe('b')
    expect(document.activeElement).toBe(tabB)

    // Right -> C
    await user.keyboard('{ArrowRight}')
    expect(screen.getByTestId('active-id').textContent).toBe('c')
    expect(document.activeElement).toBe(tabC)

    // Right -> wrap to A
    await user.keyboard('{ArrowRight}')
    expect(screen.getByTestId('active-id').textContent).toBe('a')
    expect(document.activeElement).toBe(tabA)
  })

  it('ArrowLeft moves focus to previous tab and wraps at start', async () => {
    const user = userEvent.setup()
    render(<TestTabs ids={['a', 'b', 'c']} defaultTabId="a" orientation="horizontal" />)
    const [tabA, tabB, tabC] = ['a', 'b', 'c'].map((id) => screen.getByRole('tab', { name: `Tab ${id}` }));

    (tabA as HTMLButtonElement).focus()
    expect(document.activeElement).toBe(tabA)

    // Left from A -> wrap to C
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByTestId('active-id').textContent).toBe('c')
    expect(document.activeElement).toBe(tabC)

    // Left from C -> B
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByTestId('active-id').textContent).toBe('b')
    expect(document.activeElement).toBe(tabB)
  })

  it('Home jumps to first tab; End jumps to last tab', async () => {
    const user = userEvent.setup()
    render(<TestTabs ids={['a', 'b', 'c', 'd']} defaultTabId="c" orientation="horizontal" />)
    const tabA = screen.getByRole('tab', { name: 'Tab a' })
    const tabD = screen.getByRole('tab', { name: 'Tab d' });

    (screen.getByRole('tab', { name: 'Tab c' }) as HTMLButtonElement).focus()

    await user.keyboard('{Home}')
    expect(screen.getByTestId('active-id').textContent).toBe('a')
    expect(document.activeElement).toBe(tabA)

    await user.keyboard('{End}')
    expect(screen.getByTestId('active-id').textContent).toBe('d')
    expect(document.activeElement).toBe(tabD)
  })
})

describe('useTablist - vertical keyboard navigation', () => {
  it('ArrowDown/ArrowUp move between tabs when vertical', async () => {
    const user = userEvent.setup()
    render(<TestTabs ids={['x', 'y', 'z']} defaultTabId="y" orientation="vertical" />)
    const [tabX, tabY, tabZ] = ['x', 'y', 'z'].map((id) => screen.getByRole('tab', { name: `Tab ${id}` }));
    (tabY as HTMLButtonElement).focus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByTestId('active-id').textContent).toBe('z')
    expect(document.activeElement).toBe(tabZ)

    await user.keyboard('{ArrowUp}')
    expect(screen.getByTestId('active-id').textContent).toBe('y')
    expect(document.activeElement).toBe(tabY)

    // Wrap
    await user.keyboard('{ArrowUp}')
    expect(screen.getByTestId('active-id').textContent).toBe('x')
    expect(document.activeElement).toBe(tabX)
  })

  it('ArrowRight/ArrowLeft do nothing when vertical', async () => {
    const user = userEvent.setup()
    render(<TestTabs ids={['x', 'y']} defaultTabId="x" orientation="vertical" />)
    const tabX = screen.getByRole('tab', { name: 'Tab x' });
    (tabX as HTMLButtonElement).focus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByTestId('active-id').textContent).toBe('x')

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByTestId('active-id').textContent).toBe('x')
  })
})

describe('useTablist - focusing panels with Enter/Space', () => {
  it('Enter focuses the active panel', async () => {
    const user = userEvent.setup()
    render(<TestTabs ids={['a', 'b']} defaultTabId="b" orientation="horizontal" />)
    const tabB = screen.getByRole('tab', { name: 'Tab b' });
    (tabB as HTMLButtonElement).focus()

    await user.keyboard('{Enter}')
    expect((document.getElementById('panel-b') as HTMLElement)).toBe(document.activeElement)
  })

  it('Space focuses the active panel', async () => {
    const user = userEvent.setup()
    render(<TestTabs ids={['a', 'b']} defaultTabId="a" orientation="horizontal" />)
    const tabA = screen.getByRole('tab', { name: 'Tab a' });
    (tabA as HTMLButtonElement).focus()

    await user.keyboard(' ')
    expect((document.getElementById('panel-a') as HTMLElement)).toBe(document.activeElement)
  })
})

describe('useTablist - guard conditions and resilience', () => {
  it('does nothing when active element is not a tab', async () => {
    const user = userEvent.setup()
    render(<TestTabs ids={['a', 'b']} defaultTabId="a" orientation="horizontal" />)
    const outsideButton = document.createElement('button')
    outsideButton.textContent = 'outside'
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    expect(document.activeElement).toBe(outsideButton)

    // Dispatch on container via keyboard helper: pressing ArrowRight should not change activeId
    await user.keyboard('{ArrowRight}')
    expect(screen.getByTestId('active-id').textContent).toBe('a')

    document.body.removeChild(outsideButton)
  })

  it('returns early if activeId does not match any tab (currentIndex === -1)', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <TestTabs ids={['a', 'b']} defaultTabId="a" orientation="horizontal" overrideActiveId="ghost" />
    )
    const tabA = screen.getByRole('tab', { name: 'Tab a' });
    (tabA as HTMLButtonElement).focus()
    await user.keyboard('{ArrowRight}')
    // Should remain unchanged because activeId 'ghost' is not found
    expect(screen.getByTestId('active-id').textContent).toBe('ghost')

    // Restore to a valid id and ensure navigation resumes
    rerender(<TestTabs ids={['a', 'b']} defaultTabId="a" orientation="horizontal" overrideActiveId="a" />);
    (screen.getByRole('tab', { name: 'Tab a' }) as HTMLButtonElement).focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByTestId('active-id').textContent).toBe('b')
  })

  it('ignores key events when focused tab is outside the tablist container', async () => {
    const user = userEvent.setup()
    render(<TestTabs ids={['a', 'b']} defaultTabId="a" orientation="horizontal" />)
    // Create a rogue tab outside container
    const rogue = document.createElement('button')
    rogue.setAttribute('role', 'tab')
    rogue.id = 'tab-rogue'
    document.body.appendChild(rogue)
    rogue.focus()

    await user.keyboard('{ArrowRight}')
    // activeId unchanged
    expect(screen.getByTestId('active-id').textContent).toBe('a')

    document.body.removeChild(rogue)
  })
})
