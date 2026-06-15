import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const [news, informationPage] = await Promise.all([
		client.fetch(`
			*[_type == "news"] | order(date desc) {
				_id,
				title,
				slug,
				eyebrow,
				subtitle,
				date,
				time
			}
		`),
		client.fetch(`*[_type == "informationPage"][0] { infoTextEs, infoTextEn }`)
	]);

	return { news, informationPage, meta: { title: 'FLORA Información / Information' } };
};
