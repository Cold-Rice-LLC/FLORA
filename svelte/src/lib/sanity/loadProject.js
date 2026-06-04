import { client } from '$lib/sanity/client.js';

export async function loadProject({ params }) {
	const { slug } = params;

	const project = await client.fetch(
		`*[_type == "project" && slug.current == $slug][0] {
			_id,
			title,
			slug,
			projectNumber,
			date,
			introduction,
			phases[] {
				_key,
				category-> { _id, order, titleEs, titleEn },
				modules[] {
					_type,
					_key,
					image { asset-> },
					captionEs,
					captionEn,
					textEs,
					textEn
				}
			}
		}`,
		{ slug }
	);

	return { project };
}
