
/**
 * Helper function to create DOM elements with classes and text content.
 * @param tag The HTML tag name (e.g., 'div', 'span')
 * @param cls The class name(s) (space-separated)
 * @param txt Optional text content
 * @param children Optional array of child nodes
 * @returns The created HTMLElement
 */
export function h(tag: string, cls: string, txt?: string, children: Node[] = []): HTMLElement {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (txt) el.textContent = txt;
    children.forEach(c => el.appendChild(c));
    return el;
}
