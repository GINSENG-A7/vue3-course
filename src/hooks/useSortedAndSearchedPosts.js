import { ref, computed } from "vue"

export default function useSortedPosts(sortedPosts) {
	const searchQuery = ref('');
	const sortedAndSearchedPosts = computed(() => {
		return sortedPosts.value.filter(({title, body}) => {
			return (title + " " + body).toLowerCase().includes(searchQuery.value.toLowerCase());
		});
	});

	return {
		sortedAndSearchedPosts,
		searchQuery,
	}
};