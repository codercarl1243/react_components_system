export type KeyCallbackMap = {
  [key: string]: () => void;
};

export function handleKeyPress(
  event: React.KeyboardEvent | KeyboardEvent,
  keyMap: KeyCallbackMap
) {
  const callback = keyMap[event.key];
  if (callback) {
    event.preventDefault();
    callback();
  }
}