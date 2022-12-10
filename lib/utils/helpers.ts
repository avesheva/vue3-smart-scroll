export const delay = (f: (args?: never) => void, t: number) => {
  let timeoutId: number | null = null

  return (args) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => { f(args) }, t) as number
  }
}