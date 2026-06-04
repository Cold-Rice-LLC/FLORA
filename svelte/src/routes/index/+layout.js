import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const stages = await client.fetch(
		`*[_type == "phaseCategory"] | order(order asc) { _id, order, titleEs, titleEn }`
	);

	return { stages };
};
