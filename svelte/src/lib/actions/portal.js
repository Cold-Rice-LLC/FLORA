export function portal(node, target = document.body) {
	target.appendChild(node);

	return {
		update(newTarget) {
			newTarget.appendChild(node);
		},
		destroy() {
			node.remove();
		}
	};
}
