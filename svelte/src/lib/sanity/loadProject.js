import { client, ogImage } from '$lib/sanity/client.js';

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
			previewText,
			featuredImage { asset-> },
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

	const title = project
		? ['FLORA', project.projectNumber, project.title].filter(Boolean).join(' ')
		: 'FLORA';

	const meta = {
		title,
		description: project?.previewText,
		image: ogImage(project?.featuredImage)
	};

	return { project, meta };
}
