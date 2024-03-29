import axios from "axios";
import {onMounted, ref} from "vue";

export function usePosts(limit, page) {
	const posts = ref([]);
	const totalPages = ref(0);
	const isPostsLoading = ref(true);
	const lastLoadedCount = ref(0);
	const fetching = async () => { 
		try {
			isPostsLoading.value = true;
			const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
				params: {
					_page: page.value,
					_limit: limit.value,
				} 
			});
			totalPages.value = Math.ceil(response.data.length / limit);
			posts.value = response.data;
			lastLoadedCount.value = response.data.length;
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