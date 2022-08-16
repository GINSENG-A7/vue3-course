import axios from "axios";
import {onMounted, ref} from "vue";

export function usePosts(limit) {
	const posts = ref([]);
	const totalPages = ref(0);
	const isPostsLoading = ref(true);
	const lastLoadedCount = ref(0);
	const fetching = async () => { 
		try {
			isPostsLoading.value = true;
			const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
				params: {
					_page: 1,
					_limit: limit,
				} 
			});
			totalPages.value = Math.ceil(response.data.length / limit);
			posts.value = response.data;
			lastLoadedCount.value = response.data.length;
			console.log(lastLoadedCount);
		}
		catch(e) {
			console.log(e);
			alert("Ошибка сервера");
		}
		finally {
			isPostsLoading.value = false;
		}
	}

	onMounted(fetching);

	return {
		posts, isPostsLoading, totalPages, lastLoadedCount
	}
}