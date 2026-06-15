import { client, ogImage } from '$lib/sanity/client.js';

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
			modules[] {
				_type,
				_key,
				_type == 'imageModule' => {
					image { asset-> },
					captionEs,
					captionEn
				},
				_type == 'textModule' => {
					textEs,
					textEn
				}
			}
		}`,
		{ slug }
	);

	const firstImage = news?.modules?.find((m) => m._type === 'imageModule')?.image;

	const meta = {
		title: news ? ['FLORA', news.title].filter(Boolean).join(' ') : 'FLORA',
		description: news?.subtitle,
		image: ogImage(firstImage)
	};

	return { news, meta };
}
