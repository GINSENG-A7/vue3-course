import axios from "axios";
import {onMounted, ref} from "vue";

export default async function getMorePosts(limit, page, posts, totalPages, isPostsLoading, lastLoadedCount) {
	try {
		console.log(...posts.value);
		page.value += 1;
		const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
			params: {
				_page: page.value,
				_limit: limit.value,
			} 
		});
		totalPages.value = Math.ceil(response.data.length / limit);
		posts.value = [...posts.value, ...response.data];
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