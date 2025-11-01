import { getKeyAlias, handleKeyPress, normalizeKey, isShiftedSymbol, getKeyFromCode } from '@/lib/utils/keyboardHandlers'
import type { KeyPressCallbackMap, KeyPressEventType } from '@/lib/utils/keyboardHandlers.type'

describe('handleKeyPress', () => {
  // Helper to create a minimal KeyboardEvent-like object with tracking
  function makeEvent(
    key: string,
    modifiers?: {
      ctrlKey?: boolean
      metaKey?: boolean
      shiftKey?: boolean
      altKey?: boolean
    },
    code?: string
  ): KeyPressEventType {
    return {
      key,
      code: code || '',
      ctrlKey: modifiers?.ctrlKey ?? false,
      metaKey: modifiers?.metaKey ?? false,
      shiftKey: modifiers?.shiftKey ?? false,
      altKey: modifiers?.altKey ?? false,
      preventDefault: jest.fn(),
    } as unknown as KeyPressEventType
  }

  describe('basic functionality', () => {
    it('returns early if !event.key', () => {
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
    })

    it('returns early for empty keyMap', () => {
      const keyMap: KeyPressCallbackMap = {}
      const event = makeEvent('anyKey')

      handleKeyPress(event, keyMap)

      expect(event.preventDefault).not.toHaveBeenCalled()
    })

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
  })

  describe('case insensitivity', () => {
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
      expect(mockCallbackUpper).toHaveBeenCalled()
      
      // Uppercase key in map, Uppercase input  
      handleKeyPress(makeEvent('B'), keyMap)
      expect(mockCallbackUpper).toHaveBeenCalled()
    })
  })

  describe('key aliases', () => {
    it('uses space alias when Spacebar is pressed', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = { 'Space': mockCallback }
      handleKeyPress(makeEvent('Spacebar'), keyMap)
      expect(mockCallback).toHaveBeenCalled()
    })

    it('uses escape alias when Esc is pressed', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = { 'Escape': mockCallback }
      handleKeyPress(makeEvent('Esc'), keyMap)
      expect(mockCallback).toHaveBeenCalled()
    })

    it('uses delete alias when Del is pressed', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = { 'Delete': mockCallback }
      handleKeyPress(makeEvent('Del'), keyMap)
      expect(mockCallback).toHaveBeenCalled()
    })

    it('uses arrowleft alias when Left is pressed', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = { 'ArrowLeft': mockCallback }
      handleKeyPress(makeEvent('Left'), keyMap)
      expect(mockCallback).toHaveBeenCalled()
    })

    it('uses arrowright alias when Right is pressed', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = { 'ArrowRight': mockCallback }
      handleKeyPress(makeEvent('Right'), keyMap)
      expect(mockCallback).toHaveBeenCalled()
    })

    it('uses arrowup alias when Up is pressed', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = { 'ArrowUp': mockCallback }
      handleKeyPress(makeEvent('Up'), keyMap)
      expect(mockCallback).toHaveBeenCalled()
    })

    it('uses arrowdown alias when Down is pressed', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = { 'ArrowDown': mockCallback }
      handleKeyPress(makeEvent('Down'), keyMap)
      expect(mockCallback).toHaveBeenCalled()
    })

    it('uses enter alias when Return is pressed', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = { 'Enter': mockCallback }
      handleKeyPress(makeEvent('Return'), keyMap)
      expect(mockCallback).toHaveBeenCalled()
    })

    it('uses control alias when Ctrl is pressed', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = { 'Control': mockCallback }
      handleKeyPress(makeEvent('Ctrl'), keyMap)
      expect(mockCallback).toHaveBeenCalled()
    })
  })

  describe('modifier keys', () => {
    describe('single modifier combinations', () => {
      it('handles Control+key combinations', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Control+Enter': mockCallback
        }
        const event = makeEvent('Enter', { ctrlKey: true })

        handleKeyPress(event, keyMap)

        expect(event.preventDefault).toHaveBeenCalled()
        expect(mockCallback).toHaveBeenCalledWith(event)
      })

      it('handles Meta+key combinations', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Meta+k': mockCallback
        }
        const event = makeEvent('k', { metaKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })

      it('handles Shift+key combinations', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Shift+Tab': mockCallback
        }
        const event = makeEvent('Tab', { shiftKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })

      it('handles Alt+key combinations', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Alt+f': mockCallback
        }
        const event = makeEvent('f', { altKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })
    })

    describe('multiple modifier combinations', () => {
      it('handles Control+Shift+key', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Control+Shift+p': mockCallback
        }
        const event = makeEvent('p', { ctrlKey: true, shiftKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })

      it('handles Meta+Shift+key', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Meta+Shift+l': mockCallback
        }
        const event = makeEvent('l', { metaKey: true, shiftKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })

      it('handles Control+Alt+key', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Control+Alt+Delete': mockCallback
        }
        const event = makeEvent('Delete', { ctrlKey: true, altKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })
    })

    describe('modifier case insensitivity', () => {
      it('matches modifier combinations case-insensitively', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'control+enter': mockCallback  // lowercase in map
        }
        const event = makeEvent('Enter', { ctrlKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })

      it('matches different modifier key capitalizations', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'CONTROL+SHIFT+A': mockCallback  // uppercase in map
        }
        const event = makeEvent('a', { ctrlKey: true, shiftKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })
    })

    describe('modifier only keys', () => {
      it('handles pressing just Control key', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Control': mockCallback
        }
        const event = makeEvent('Control', { ctrlKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })

      it('handles pressing just Meta key', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Meta': mockCallback
        }
        const event = makeEvent('Meta', { metaKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).toHaveBeenCalled()
      })
    })

    describe('wrong modifier combinations', () => {
      it('does not trigger callback when wrong modifier is pressed', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Control+a': mockCallback
        }
        // User presses Meta+a instead of Control+a
        const event = makeEvent('a', { metaKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).not.toHaveBeenCalled()
        expect(event.preventDefault).not.toHaveBeenCalled()
      })

      it('does not trigger when key is pressed without required modifier', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Control+Enter': mockCallback
        }
        // User presses just Enter without Control
        const event = makeEvent('Enter')

        handleKeyPress(event, keyMap)

        expect(mockCallback).not.toHaveBeenCalled()
      })

      it('does not trigger when extra modifiers are pressed', () => {
        const mockCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'Control+a': mockCallback
        }
        // User presses Control+Shift+a instead of just Control+a
        const event = makeEvent('a', { ctrlKey: true, shiftKey: true })

        handleKeyPress(event, keyMap)

        expect(mockCallback).not.toHaveBeenCalled()
      })
    })

    describe('mixed modifier and non-modifier keys', () => {
      it('prioritizes modifier combination over plain key', () => {
        const plainCallback = jest.fn()
        const modifierCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          'a': plainCallback,
          'Control+a': modifierCallback
        }
        const event = makeEvent('a', { ctrlKey: true })

        handleKeyPress(event, keyMap)

        expect(modifierCallback).toHaveBeenCalled()
        expect(plainCallback).not.toHaveBeenCalled()
      })

      it('handles multiple different combinations for same key', () => {
        const plainCallback = jest.fn()
        const ctrlCallback = jest.fn()
        const metaCallback = jest.fn()
        const keyMap: KeyPressCallbackMap = {
          's': plainCallback,
          'Control+s': ctrlCallback,
          'Meta+s': metaCallback
        }

        // Plain s
        handleKeyPress(makeEvent('s'), keyMap)
        expect(plainCallback).toHaveBeenCalled()
        expect(ctrlCallback).not.toHaveBeenCalled()

        // Control+s
        plainCallback.mockClear()
        handleKeyPress(makeEvent('s', { ctrlKey: true }), keyMap)
        expect(ctrlCallback).toHaveBeenCalled()
        expect(plainCallback).not.toHaveBeenCalled()

        // Meta+s
        ctrlCallback.mockClear()
        handleKeyPress(makeEvent('s', { metaKey: true }), keyMap)
        expect(metaCallback).toHaveBeenCalled()
        expect(ctrlCallback).not.toHaveBeenCalled()
      })
    })
  })

  describe('getKeyAlias', () => {
    const aliasTestCases = [
      // [input, expected]
      [' ', 'space'],
      ['Spacebar', 'space'],
      ['spacebar', 'space'],
      ['Esc', 'escape'],
      ['esc', 'escape'],
      ['Del', 'delete'],
      ['del', 'delete'],
      ['Delete', 'delete'],
      ['Left', 'arrowleft'],
      ['left', 'arrowleft'],
      ['Right', 'arrowright'],
      ['right', 'arrowright'],
      ['Up', 'arrowup'],
      ['up', 'arrowup'],
      ['Down', 'arrowdown'],
      ['down', 'arrowdown'],
      ['Enter', 'enter'],
      ['enter', 'enter'],
      ['Return', 'enter'],
      ['return', 'enter'],
      ['Control', 'control'],
      ['control', 'control'],
      ['Ctrl', 'control'],
      ['ctrl', 'control'],
    ] as const

    it.each(aliasTestCases)('returns "%s" for input "%s"', (input, expected) => {
      expect(getKeyAlias(input)).toBe(expected)
    })
    
    const noAliasTestCases = [
      'Tab', 'a', 'ArrowLeft', 'Escape', 'Space', 'F1', 'Home', 'End'
    ]
    it.each(noAliasTestCases)('returns lowercase version for non-aliased key "%s"', (key) => {
      expect(getKeyAlias(key)).toBe(key.toLowerCase())
    })

    it('returns empty string for empty input', () => {
      expect(getKeyAlias('')).toBe('')
    })
  })

  describe('normalizeKeyMap with aliases and modifier order', () => {
    it('normalizes Ctrl alias to control', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Ctrl+s': mockCallback  // Using alias
      }
      const event = makeEvent('s', { ctrlKey: true })

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('handles modifiers in any order', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Shift+Control+k': mockCallback  // Wrong order
      }
      const event = makeEvent('k', { ctrlKey: true, shiftKey: true })

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('normalizes Esc alias in combinations', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Control+Esc': mockCallback  // Using Esc alias
      }
      const event = makeEvent('Escape', { ctrlKey: true })

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('handles Spacebar alias with modifiers', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Shift+Spacebar': mockCallback
      }
      const event = makeEvent(' ', { shiftKey: true })

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('handles empty string key in keyMap', () => {
      const mockCallback = jest.fn()
      const validCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        '': mockCallback,  // Empty key
        'a': validCallback
      }
      
      // Should not throw, and valid key should still work
      expect(() => handleKeyPress(makeEvent('a'), keyMap)).not.toThrow()
      expect(validCallback).toHaveBeenCalled()
      expect(mockCallback).not.toHaveBeenCalled()
    })

    it('preserves empty key entries without modification', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        '': mockCallback
      }
      
      // The empty key should remain in the normalized map even if it can't be triggered
      expect(() => handleKeyPress(makeEvent(''), keyMap)).not.toThrow()
    })
  })

  describe('shifted symbol shortcuts', () => {
    it('handles Shift+/ (question mark)', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Shift+/': mockCallback  // Registered as Shift+/
      }
      // When user presses Shift+/, event.key is '?' but event.code is 'Slash'
      const event = makeEvent('?', { shiftKey: true }, 'Slash')

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('handles Shift+1 (exclamation mark)', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Shift+1': mockCallback
      }
      // event.key is '!' but event.code is 'Digit1'
      const event = makeEvent('!', { shiftKey: true }, 'Digit1')

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('handles Control+Shift+1', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Control+Shift+1': mockCallback
      }
      // event.key is '!' with both modifiers
      const event = makeEvent('!', { ctrlKey: true, shiftKey: true }, 'Digit1')

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('handles Shift+[ (curly brace)', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Shift+[': mockCallback
      }
      // event.key is '{' but event.code is 'BracketLeft'
      const event = makeEvent('{', { shiftKey: true }, 'BracketLeft')

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('handles Shift+; (colon)', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Shift+;': mockCallback
      }
      // event.key is ':' but event.code is 'Semicolon'
      const event = makeEvent(':', { shiftKey: true }, 'Semicolon')

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('handles Shift+\' (double quote)', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        "Shift+'": mockCallback
      }
      // event.key is '"' but event.code is 'Quote'
      const event = makeEvent('"', { shiftKey: true }, 'Quote')

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('handles Meta+Shift+/ for help shortcuts', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Meta+Shift+/': mockCallback
      }
      // Common pattern for help menus (Cmd+Shift+/ or Cmd+?)
      const event = makeEvent('?', { metaKey: true, shiftKey: true }, 'Slash')

      handleKeyPress(event, keyMap)

      expect(mockCallback).toHaveBeenCalled()
    })

    it('does not match shifted symbol without Shift in keyMap', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        '/': mockCallback  // No Shift
      }
      // User presses Shift+/ (which produces '?')
      const event = makeEvent('?', { shiftKey: true }, 'Slash')

      handleKeyPress(event, keyMap)

      expect(mockCallback).not.toHaveBeenCalled()
    })

    it('does not match unshifted key when Shift+key is in keyMap', () => {
      const mockCallback = jest.fn()
      const keyMap: KeyPressCallbackMap = {
        'Shift+1': mockCallback
      }
      // User presses just '1' without Shift
      const event = makeEvent('1', {}, 'Digit1')

      handleKeyPress(event, keyMap)

      expect(mockCallback).not.toHaveBeenCalled()
    })
  })

  describe('normalizeKey', () => {
    it('normalizes simple keys to lowercase', () => {
      const event = makeEvent('A')
      expect(normalizeKey('A', event)).toBe('a')
    })

    it('normalizes named keys to lowercase', () => {
      const event = makeEvent('Enter')
      expect(normalizeKey('Enter', event)).toBe('enter')
    })

    it('applies aliases before normalization', () => {
      const event = makeEvent('Esc')
      expect(normalizeKey('Esc', event)).toBe('escape')
    })

    it('combines Control modifier with key', () => {
      const event = makeEvent('a', { ctrlKey: true })
      expect(normalizeKey('a', event)).toBe('control+a')
    })

    it('combines multiple modifiers in consistent order', () => {
      const event = makeEvent('a', { ctrlKey: true, shiftKey: true, altKey: true })
      expect(normalizeKey('a', event)).toBe('control+shift+alt+a')
    })

    it('handles modifier-only key press', () => {
      const event = makeEvent('Control', { ctrlKey: true })
      expect(normalizeKey('Control', event)).toBe('control')
    })

    it('returns empty string for empty key', () => {
      const event = makeEvent('')
      expect(normalizeKey('', event)).toBe('')
    })

    it('derives unshifted key from code for shifted symbols', () => {
      // Shift+/ produces '?' but should normalize to 'shift+/'
      const event = makeEvent('?', { shiftKey: true }, 'Slash')
      expect(normalizeKey('?', event)).toBe('shift+/')
    })

    it('derives unshifted key from code for shifted digits', () => {
      // Shift+1 produces '!' but should normalize to 'shift+1'
      const event = makeEvent('!', { shiftKey: true }, 'Digit1')
      expect(normalizeKey('!', event)).toBe('shift+1')
    })

    it('handles shifted brackets correctly', () => {
      // Shift+[ produces '{' but should normalize to 'shift+['
      const event = makeEvent('{', { shiftKey: true }, 'BracketLeft')
      expect(normalizeKey('{', event)).toBe('shift+[')
    })

    it('uses key (not code) when shift is not pressed', () => {
      // Regular slash without shift
      const event = makeEvent('/', {}, 'Slash')
      expect(normalizeKey('/', event)).toBe('/')
    })

    it('uses key (not code) for non-symbol keys even with shift', () => {
      // Letters with shift should use the key (uppercase letter)
      const event = makeEvent('A', { shiftKey: true }, 'KeyA')
      expect(normalizeKey('A', event)).toBe('shift+a')
    })
  })

  describe('isShiftedSymbol', () => {
    it('returns true for shifted digits', () => {
      expect(isShiftedSymbol('!', 'Digit1')).toBe(true)
      expect(isShiftedSymbol('@', 'Digit2')).toBe(true)
      expect(isShiftedSymbol('#', 'Digit3')).toBe(true)
    })

    it('returns true for shifted punctuation', () => {
      expect(isShiftedSymbol('?', 'Slash')).toBe(true)
      expect(isShiftedSymbol(':', 'Semicolon')).toBe(true)
      expect(isShiftedSymbol('"', 'Quote')).toBe(true)
      expect(isShiftedSymbol('{', 'BracketLeft')).toBe(true)
    })

    it('returns true for single-character keys with shiftable codes (even if unshifted)', () => {
      // These are single characters with codes that can produce different chars when shifted
      // The function needs to return true so we can check event.shiftKey and use code appropriately
      expect(isShiftedSymbol('/', 'Slash')).toBe(true)
      expect(isShiftedSymbol(';', 'Semicolon')).toBe(true)
      expect(isShiftedSymbol('1', 'Digit1')).toBe(true)
    })

    it('returns false for multi-character keys', () => {
      expect(isShiftedSymbol('Enter', 'Enter')).toBe(false)
      expect(isShiftedSymbol('Escape', 'Escape')).toBe(false)
    })

    it('returns false for regular letter keys', () => {
      expect(isShiftedSymbol('A', 'KeyA')).toBe(false)
      expect(isShiftedSymbol('z', 'KeyZ')).toBe(false)
    })

    it('returns false for non-shiftable single-char codes', () => {
      // Single char but code is not in the special punctuation/digit list
      expect(isShiftedSymbol('a', 'Tab')).toBe(false)
      expect(isShiftedSymbol(' ', 'Space')).toBe(false)
    })
  })

  describe('getKeyFromCode', () => {
    it('converts Digit codes to numbers', () => {
      expect(getKeyFromCode('Digit1')).toBe('1')
      expect(getKeyFromCode('Digit5')).toBe('5')
      expect(getKeyFromCode('Digit0')).toBe('0')
    })

    it('converts Key codes to lowercase letters', () => {
      expect(getKeyFromCode('KeyA')).toBe('a')
      expect(getKeyFromCode('KeyZ')).toBe('z')
      expect(getKeyFromCode('KeyM')).toBe('m')
    })

    it('converts punctuation codes to symbols', () => {
      expect(getKeyFromCode('Slash')).toBe('/')
      expect(getKeyFromCode('Backslash')).toBe('\\')
      expect(getKeyFromCode('BracketLeft')).toBe('[')
      expect(getKeyFromCode('BracketRight')).toBe(']')
      expect(getKeyFromCode('Semicolon')).toBe(';')
      expect(getKeyFromCode('Quote')).toBe("'")
      expect(getKeyFromCode('Comma')).toBe(',')
      expect(getKeyFromCode('Period')).toBe('.')
      expect(getKeyFromCode('Minus')).toBe('-')
      expect(getKeyFromCode('Equal')).toBe('=')
      expect(getKeyFromCode('Backquote')).toBe('`')
    })

    it('returns lowercase code for unknown codes', () => {
      expect(getKeyFromCode('UnknownCode')).toBe('unknowncode')
      expect(getKeyFromCode('F1')).toBe('f1')
    })
  })
})