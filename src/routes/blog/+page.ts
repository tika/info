import { getAllPosts } from '$lib/blog';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const posts = await getAllPosts();

		return {
			posts
		};
	} catch (err) {
		console.error('Error loading blog posts:', err);
		throw error(500, {
			message: 'Error loading blog posts'
		});
	}
};
