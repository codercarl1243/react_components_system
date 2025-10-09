export default function isThenable(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null && 
    typeof value === 'object' && 
    typeof (value as PromiseLike<unknown>).then === 'function'
  )
}