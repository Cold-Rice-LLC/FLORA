import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
	projectId: 'u67zcjih',
	dataset: 'production',
	apiVersion: '2024-07-19',
	useCdn: true
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
	return builder.image(source);
};

export const getImageHeight = (width, aspectRatio) => {
	return width / aspectRatio;
};

// Build a social-share (Open Graph) image URL at the standard 1200x630 size.
export const ogImage = (source) => {
	if (!source?.asset) return undefined;
	return urlFor(source).width(1200).height(630).fit('crop').auto('format').url();
};
