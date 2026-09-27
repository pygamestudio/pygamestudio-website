/**
 * Render emphasis that CJK text breaks.
 *
 * CommonMark only lets a closing `**` that follows punctuation (like `）`) stay
 * a closing delimiter when a space or punctuation follows it too. In Chinese
 * docs the pattern `**椭圆（Ellipse）**并设置` is everywhere, and it fails that
 * rule, so the asterisks stay visible as literal text.
 *
 * Any `**...**` that survived parsing inside a text node was meant as emphasis,
 * so turn it into one. Code, links and inline HTML use other node types and are
 * left untouched.
 */
const EMPHASIS = /\*\*(.+?)\*\*/g;

function transform(parent) {
	const children = parent.children;
	if (!Array.isArray(children)) return;

	for (let index = 0; index < children.length; index += 1) {
		const child = children[index];
		if (child.type === 'text' && child.value.includes('**')) {
			const parts = [];
			let last = 0;
			for (const match of child.value.matchAll(EMPHASIS)) {
				if (match.index > last) {
					parts.push({ type: 'text', value: child.value.slice(last, match.index) });
				}
				parts.push({ type: 'strong', children: [{ type: 'text', value: match[1] }] });
				last = match.index + match[0].length;
			}
			if (parts.length) {
				if (last < child.value.length) {
					parts.push({ type: 'text', value: child.value.slice(last) });
				}
				children.splice(index, 1, ...parts);
				index += parts.length - 1;
			}
		} else {
			transform(child);
		}
	}
}

export default function remarkCjkEmphasis() {
	return (tree) => transform(tree);
}
