/**
 * Hide the element when clicking outside of his markup. 
 * Intended to be in a wrapper function for an event listener.
 * @param {string} name - Name of a component stored in the data-component attribute.
 * @param {function} stateHandler - Function that handles visibility state of an element.
 * @example
 * const [ isVisible, setIsVisible ] = useState( false );
 * const listener = handleOutsideClick( "PopupMenu", setIsVisible );
 * document.body.addEventListener( "click", listener );
 */
export function handleOutsideClick(name: string, stateHandler: Function): false | any {
  return ({ target }: { target: HTMLElement }) => {
    if (target.closest(`[data-component=${name}]`)) {
      return false
    } else {
      stateHandler(false)
    }
  }
}
