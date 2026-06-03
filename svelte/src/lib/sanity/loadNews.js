import { client } from '$lib/sanity/client.js';

export async function loadNews({ params }) {
	const { slug } = params;

	const news = await client.fetch(
		`*[_type == "news" && slug.current == $slug][0] {
			_id,
			title,
			slug,
			eyebrow,
			subtitle,
			date,
			time,
			modules
		}`,
		{ slug }
	);

	return { news };
}
