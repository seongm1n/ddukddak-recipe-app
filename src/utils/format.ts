export function formatPrice(price: number): string {
  return `\u20A9${price.toLocaleString('ko-KR')}`
}
