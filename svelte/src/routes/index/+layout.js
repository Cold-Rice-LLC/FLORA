import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const [stages, projects] = await Promise.all([
		client.fetch(
			`*[_type == "phaseCategory"] | order(order asc) { _id, order, titleEs, titleEn }`
		),
		client.fetch(`
			*[_type == "project"] | order(date desc) {
				_id,
				title,
				slug,
				projectNumber,
				date,
				previewText,
				featuredImage { asset-> },
				phases[] {
					_key,
					lastUpdated,
					category-> { _id, order, titleEs, titleEn },
					modules[] {
						_type,
						_key,
						image { asset-> }
					}
				}
			}
		`)
	]);

	return { stages, projects, meta: { title: 'FLORA Índice / Index' } };
};
