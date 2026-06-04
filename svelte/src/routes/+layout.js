import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const homePage = await client.fetch(`
		*[_type == "homePage"][0] {
			featuredProjects[]-> {
				_id,
				title,
				slug,
				projectNumber,
				date,
				featuredImage { asset-> }
			}
		}
	`);

	return { featuredProjects: homePage?.featuredProjects ?? [] };
};
