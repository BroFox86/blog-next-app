/**
 * Getting the CSS property value.
 * @param {HTMLElement} element DOM element.
 * @param {string} property CSS property.
 * @returns {string} CSS property value.
 */
export function getStyleValue(element: HTMLElement, property: string) {
  const style: { [key: string]: any } = getComputedStyle(element)

  return parseFloat(style[property])
}

/**
 * Getting the CSS transitionDuration value.
 * @param {HTMLElement} element DOM element.
 */
export function getTransitionDuration(element: HTMLElement): number {
  return getStyleValue(element, 'transitionDuration') * 1000
}
