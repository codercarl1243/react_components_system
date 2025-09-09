// Placeholder test file created by CodeRabbit to house unit tests for handleKeyPress
// AUTO-GENERATED TESTS: handleKeyPress (CodeRabbit)
// NOTE: Detected testing framework: Jest
// These tests use only describe/it/expect and simple spies (no jest.fn/vi.fn) to be compatible with Jest and Vitest.
// Focus: Validates behavior of handleKeyPress for mapped/unmapped keys, ordering, error propagation, and edge cases.
import { handleKeyPress, type KeyCallbackMap } from "@/utils/keyboardHandlers";

describe("handleKeyPress", () => {
  // Helper to create a minimal KeyboardEvent-like object with tracking
  function makeEvent(key: string) {
    let prevented = false;
    const event: any = {
      key,
      preventDefault: () => { prevented = true; },
    };
    return {
      event,
      get prevented() { return prevented; },
      reset: () => { prevented = false; }
    };
  }

  it("calls preventDefault and then invokes the mapped callback when the key exists", () => {
    const ctx = makeEvent("Enter");
    const callOrder: string[] = [];
    const keyMap = {
      Enter: () => {
        // this should run after preventDefault
        callOrder.push("callback");
        expect(ctx.prevented).toBe(true);
      },
    } as KeyCallbackMap;

    handleKeyPress(ctx.event as any, keyMap);
    expect(callOrder).toEqual(["callback"]);
    expect(ctx.prevented).toBe(true);
  });

  it("does nothing (does not prevent default or call any callback) for unmapped keys", () => {
    const ctx = makeEvent("Enter");
    const sideEffects: { called: boolean } = { called: false };
    const keyMap = {
      Escape: () => { sideEffects.called = true; },
    } as KeyCallbackMap;

    handleKeyPress(ctx.event as any, keyMap);
    expect(sideEffects.called).toBe(false);
    expect(ctx.prevented).toBe(false);
  });

  it("invokes only the callback corresponding to the pressed key when multiple mappings exist", () => {
    const ctx = makeEvent("Escape");
    const calls: string[] = [];
    const keyMap = {
      Enter: () => calls.push("Enter"),
      Escape: () => calls.push("Escape"),
      a: () => calls.push("a"),
    } as KeyCallbackMap;

    handleKeyPress(ctx.event as any, keyMap);
    expect(calls).toEqual(["Escape"]);
    expect(ctx.prevented).toBe(true);
  });

//   it("matches keys case-sensitively (e.g., 'a' \!== 'A')", () => {
//     const ctx = makeEvent("A");
//     const calls: string[] = [];
//     const keyMap = {
//       a: () => calls.push("lower-a"),
//     } as KeyCallbackMap;

//     handleKeyPress(ctx.event as any, keyMap);
//     expect(calls).toEqual([]); // no match for uppercase 'A'
//     expect(ctx.prevented).toBe(false);
//   });

  it("still prevents default before propagating an error thrown by the callback", () => {
    const ctx = makeEvent("Escape");
    const keyMap = {
      Escape: () => {
        // preventDefault should have been called before this throws
        if (!ctx.prevented) {
          throw new Error("preventDefault not called first");
        }
        throw new Error("boom");
      },
    } as KeyCallbackMap;

    try {
      handleKeyPress(ctx.event as any, keyMap);
    } catch (e: any) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe("boom");
    }
    // Regardless of the thrown error, preventDefault should have been called first
    expect(ctx.prevented).toBe(true);
  });

  it("handles an empty key map gracefully (no preventDefault, no callback)", () => {
    const ctx = makeEvent("Enter");
    const keyMap = {} as KeyCallbackMap;

    handleKeyPress(ctx.event as any, keyMap);
    expect(ctx.prevented).toBe(false);
  });
});