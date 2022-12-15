export const delay = (f: (args: UIEvent) => void, t: number) => {
  let timeoutId: number | null = null

  return (args: UIEvent) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => { f(args) }, t) as unknown as number
  }
}