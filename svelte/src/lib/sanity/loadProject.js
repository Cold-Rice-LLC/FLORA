export async function loadProject({ params }) {
	const { slug } = params;

	// TODO: fetch project from Sanity by slug

	return {
		slug
	};
}
