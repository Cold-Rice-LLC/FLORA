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
			featuredImage { asset-> },
			phases[] {
				_key,
				category-> { _id, order, titleEs, titleEn },
				modules[] {
					_type,
					_key,
					date,
					image { asset-> },
					video { asset-> },
					poster { asset-> },
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

	// Derive a plain-text OG/social description from the first paragraph of the
	// introduction rich text (Preview Text now lives per-module, not per-project).
	const description =
		project?.introduction
			?.find((block) => block._type === 'block')
			?.children?.map((child) => child.text)
			.join('') || undefined;

	const meta = {
		title,
		description,
		image: ogImage(project?.featuredImage)
	};

	return { project, meta };
}
