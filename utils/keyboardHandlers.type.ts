import { KeyboardEvent as ReactKeyBoardEvent } from 'react'

export type KeyPressEventType = ReactKeyBoardEvent | KeyboardEvent;

export type KeyPressCallbackMap = {
  [key: string]: (e?: KeyPressEventType) => void;
};