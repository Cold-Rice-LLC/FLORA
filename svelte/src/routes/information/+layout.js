import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const news = await client.fetch(`
		*[_type == "news"] | order(date desc) {
			_id,
			title,
			slug,
			eyebrow,
			subtitle,
			date,
			time
		}
	`);

	return { news };
};
