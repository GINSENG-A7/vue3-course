import axios from "axios";
import {onMounted, ref} from "vue";

export function usePosts(limit) {
	const posts = ref([]);
	const totalPages = ref(0);
	const isPostsLoading = ref(true);
	const fetching = async () => {
		try {
			this.isPostsLoading = true;
			const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
				params: {
					_page: this.page,
					_limit: this.limit,
				} 
			});
			totalPages.value = Math.ceil(response.data.length / this.limit);
			posts.value = response.data;
			lastLoadedCount.value = response.data.length;
		}
		catch(e) {
			alert("Ошибка сервера");
		}
		finally {
			isPostsLoading.value = false;
		}
	
		onMounted(fetching)
		return {
			posts, isPostsLoading, totalPages
		}
	}
}