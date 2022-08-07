import { ref, computed } from "vue"

export default function useSortedPosts(posts) {
	const selectedSort = ref('');
	const sortedPosts = computed(() => {
		return [...posts.value].sort((postA, postB) => {
			return postA[selectedSort]?.localeCompare(postB[selectedSort]);
		});
	});

	return {
		selectedSort,
		sortedPosts
	}
};