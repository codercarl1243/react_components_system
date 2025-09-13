import { getKeyAlias, handleKeyPress } from '@/utils/keyboardHandlers'
import type { KeyPressCallbackMap, KeyPressEventType } from '@/utils/keyboardHandlers.type'

describe('handleKeyPress', () => {
  // Helper to create a minimal KeyboardEvent-like object with tracking
  function makeEvent(key: string): KeyPressEventType {
    return {
      key,
      preventDefault: jest.fn(),
    } as unknown as KeyPressEventType
  }

  it('if no event key is available, event.code will be used', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = {
      'a': mockCallback
    }
    const event = {
      code: 'KeyA',
      preventDefault: jest.fn(),
    } as unknown as KeyPressEventType
    
    handleKeyPress(event, keyMap)

    expect(mockCallback).toHaveBeenCalledWith(event)
  });
  it('returns early if neither event.key nor event.code is available', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = {
      'a': mockCallback
    }
    const event = {
      preventDefault: jest.fn(),
    } as unknown as KeyPressEventType
    
    handleKeyPress(event, keyMap)

    expect(mockCallback).not.toHaveBeenCalled()
    expect(event.preventDefault).not.toHaveBeenCalled()
  });

  it('calls preventDefault and then invokes the mapped callback when the key exists', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = {
      'a': mockCallback
    }
    const event = makeEvent('a')

    handleKeyPress(event, keyMap)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(mockCallback).toHaveBeenCalledWith(event)

    // verify preventDefault was called before the callback
    const preventDefaultCall = (event.preventDefault as jest.Mock).mock.invocationCallOrder[0]
    const callbackCall = mockCallback.mock.invocationCallOrder[0]
    expect(preventDefaultCall).toBeLessThan(callbackCall)
  })

  it('returns early (does not prevent default or call any callback) for unmapped keys', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = {
      'a': mockCallback
    }
    const event = makeEvent('unmappedKey')

    handleKeyPress(event, keyMap)

    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(mockCallback).not.toHaveBeenCalled()
  })
  it('returns early for unmapped keys with empty keyMap', () => {
    const keyMap: KeyPressCallbackMap = {}
    const event = makeEvent('anyKey')

    handleKeyPress(event, keyMap)

    expect(event.preventDefault).not.toHaveBeenCalled()
  })

  it('invokes the correct callback', () => {
    const mockCallbackA = jest.fn()
    const mockCallbackB = jest.fn()
    const mockCallbackC = jest.fn()
    const keyMap: KeyPressCallbackMap = {
      'a': mockCallbackA,
      'b': mockCallbackB,
      'c': mockCallbackC
    }
    const event = makeEvent('b')

    handleKeyPress(event, keyMap)

    expect(mockCallbackB).toHaveBeenCalledWith(event)
    expect(mockCallbackA).not.toHaveBeenCalled()
    expect(mockCallbackC).not.toHaveBeenCalled()
  })

  it("matches single-character keys case-insensitively (e.g., 'a' === 'A')", () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = {
      'a': mockCallback
    }
    const event = makeEvent('A')

    handleKeyPress(event, keyMap)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(mockCallback).toHaveBeenCalledWith(event)
  })
  it('supports both lowercase and uppercase keys in keyMap', () => {
    const mockCallbackLower = jest.fn()
    const mockCallbackUpper = jest.fn()
    const keyMap: KeyPressCallbackMap = {
      'a': mockCallbackLower,
      'B': mockCallbackUpper
    }

    // Lowercase key in map, uppercase input
    handleKeyPress(makeEvent('A'), keyMap)
    expect(mockCallbackLower).toHaveBeenCalled()

    // Uppercase key in map, lowercase input  
    handleKeyPress(makeEvent('b'), keyMap)
    expect(mockCallbackUpper).not.toHaveBeenCalled()
    // Uppercase key in map, Uppercase input  
    handleKeyPress(makeEvent('B'), keyMap)
    expect(mockCallbackUpper).toHaveBeenCalled()
  })

  // Test all alias return statements
  it('uses Space alias when Spacebar is pressed', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = { 'Space': mockCallback }
    handleKeyPress(makeEvent('Spacebar'), keyMap)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('uses Escape alias when Esc is pressed', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = { 'Escape': mockCallback }
    handleKeyPress(makeEvent('Esc'), keyMap)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('uses Delete alias when Del is pressed', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = { 'Delete': mockCallback }
    handleKeyPress(makeEvent('Del'), keyMap)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('uses ArrowLeft alias when Left is pressed', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = { 'ArrowLeft': mockCallback }
    handleKeyPress(makeEvent('Left'), keyMap)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('uses ArrowRight alias when Right is pressed', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = { 'ArrowRight': mockCallback }
    handleKeyPress(makeEvent('Right'), keyMap)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('uses ArrowUp alias when Up is pressed', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = { 'ArrowUp': mockCallback }
    handleKeyPress(makeEvent('Up'), keyMap)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('uses ArrowDown alias when Down is pressed', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = { 'ArrowDown': mockCallback }
    handleKeyPress(makeEvent('Down'), keyMap)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('uses Enter alias when Return is pressed', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = { 'Enter': mockCallback }
    handleKeyPress(makeEvent('Return'), keyMap)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('uses Control alias when Ctrl is pressed', () => {
    const mockCallback = jest.fn()
    const keyMap: KeyPressCallbackMap = { 'Control': mockCallback }
    handleKeyPress(makeEvent('Ctrl'), keyMap)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('prevent default is called before propagating an error thrown by the callback', () => {
    const throwingCallback = jest.fn(() => {
      throw new Error('Callback error')
    })
    const keyMap: KeyPressCallbackMap = {
      'a': throwingCallback
    }
    const event = makeEvent('a')

    expect(() => handleKeyPress(event, keyMap)).toThrow('Callback error')
    expect(event.preventDefault).toHaveBeenCalled()
  })

  describe('getKeyAlias', () => {
    const aliasTestCases = [
      // [input, expected]
      [' ', 'Space'],
      ['Spacebar', 'Space'],
      ['Esc', 'Escape'],
      ['Del', 'Delete'],
      ['Left', 'ArrowLeft'],
      ['Right', 'ArrowRight'],
      ['Up', 'ArrowUp'],
      ['Down', 'ArrowDown'],
      ['Enter', 'Enter'],
      ['Return', 'Enter'],
      ['Control', 'Control'],
      ['Ctrl', 'Control'],
    ] as const

    const noAliasTestCases = [
      'Tab', 'a', 'ArrowLeft', 'Escape', 'Space', 'Delete'
    ]

    it.each(aliasTestCases)('returns "%s" for input "%s"', (input, expected) => {
      expect(getKeyAlias(input)).toBe(expected)
    })

    it.each(noAliasTestCases)('returns undefined for non-aliased key "%s"', (key) => {
      expect(getKeyAlias(key)).toBeUndefined()
    })
    
  })
})