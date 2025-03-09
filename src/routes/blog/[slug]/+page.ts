import { getPostBySlug } from '$lib/blog';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	try {
		const post = await getPostBySlug(slug);

		if (!post) {
			throw error(404, {
				message: 'Post not found'
			});
		}

		return {
			post
		};
	} catch (err) {
		console.error(`Error loading post with slug ${slug}:`, err);
		throw error(500, {
			message: 'Error loading post'
		});
	}
};
