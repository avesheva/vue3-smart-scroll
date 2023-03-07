export const delay = (f: (args: IntersectionObserverEntry[]) => void, t: number) => {
  let timeoutId: number | null = null

  return (args: IntersectionObserverEntry[]) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => { f(args) }, t) as unknown as number
  }
}