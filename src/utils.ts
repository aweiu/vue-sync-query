export function someOf<T> (obj: any, keys: string[]): T {
  const rs: any = {}
  for (let key of keys) {
    if (obj.hasOwnProperty(key)) rs[key] = obj[key]
  }
  return rs
}
