<template>
	<div class="app container">
		<h1>Страница с постами</h1>
		<my-input placeholder="Поиск..." :model-value="searchQuery" @update:model-value="setSearchQuery"></my-input>
		<div class="container__btns">
			<my-button @click="showDialog">Создать пользователя</my-button>
			<my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
		</div>
		<my-dialog v-model:show="dialogVisible">			
			<post-form @create="createPost" style="margin-top: 30px"/>
		</my-dialog>
		<post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" style="margin-top: 20px"/>
		<div class="loading" v-else>Посты загружаются...</div>
		<!-- <div class="page__wrapper">
			<div class="page" :class="{'current-page': page == pageNumber}" v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)">{{ pageNumber }}</div>
		</div> -->

		<!-- <div ref="observer" class="observer"></div> -->
		<div v-intersection="[loadMorePosts, lastLoadedCount, limit]" class="observer"></div>
	</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
export default {
	components: {
    PostList,
    PostForm,
},
	data() {
		return {
			dialogVisible: false,
		}
	},
	methods: {
		...mapMutations({
			setPosts: "post/setPosts",
			setLoading: "post/setLoading",
			setPage: "post/setPage",
			setSelectedSort: "post/setSelectedSort",
			setSearchQuery: "post/setSearchQuery",
			setTotalPages: "post/setTotalPages",
			setLastLoadedCount: "post/setLastLoadedCount",
		}),
		...mapActions({
			loadMorePosts: "post/loadMorePosts",
			fetchPosts: "post/fetchPosts",
		}),
		createPost(post) {
			this.posts.push(post);
		},
		removePost(post) {
			this.posts = this.posts.filter(p => p.id !== post.id)
		},
		showDialog() {
			this.dialogVisible = true;
		},
		// changePage(pageNumber) {
		// 	this.page = pageNumber;
		// },
		// async fetchPosts() {
		// 	try {
		// 		this.isPostsLoading = true;
		// 		const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
		// 			params: {
		// 				_page: this.page,
		// 				_limit: this.limit,
		// 			} 
		// 		});
		// 		this.totalPages = Math.ceil(response.data.length / this.limit);
		// 		this.posts = response.data;
		// 		this.lastLoadedCount = response.data.length;
		// 	}
		// 	catch(e) {
		// 		alert("Ошибка сервера");
		// 	}
		// 	finally {
		// 		this.isPostsLoading = false;
		// 	}
		// },
		// async loadMorePosts() {
		// 	try {
		// 		this.page += 1;
		// 		// this.isPostsLoading = true;
		// 		const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
		// 			params: {
		// 				_page: this.page,
		// 				_limit: this.limit,
		// 			} 
		// 		});
		// 		this.totalPages = Math.ceil(response.data.length / this.limit);
		// 		this.posts = [...this.posts, ...response.data];
		// 		this.lastLoadedCount = response.data.length;
		// 	}
		// 	catch(e) {
		// 		alert("Ошибка сервера");
		// 	}
		// }
	},
	mounted() {
		this.fetchPosts();
	},

	// watch: {
	// 	selectedSort(newValue) {
	// 		this.posts.sort((postA, postB) => {
	// 			return postA[newValue]?.localeCompare(postB[newValue]);
	// 		});
	// 	},
	// },

	// watch: {
	// 	page() {
	// 		this.fetchPosts();
	// 	}
	// },
	computed: {
		...mapState({
			posts: state => state.post.posts,
			dialogVisible: state => state.post.dialogVisible,
			isPostsLoading: state => state.post.isPostsLoading,
			selectedSort: state => state.post.selectedSort,
			searchQuery: state => state.post.searchQuery,
			page: state => state.post.page,
			limit: state => state.post.limit,
			totalPages: state => state.post.totalPages,
			lastLoadedCount: state => state.post.lastLoadedCount,
			sortOptions: state => state.post.sortOptions,
		}),
		...mapGetters({
			sortedPosts: "post/sortedPosts",
			sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
		}),
	},
}
</script>

<style lang="scss">
	.container__btns {
		display: flex;
		justify-content: space-between;
	}
	.page__wrapper {
		display: flex;
		margin-top: 15px;
		margin-bottom: 10px;
		.page {
			border: 2px solid black;
			padding: 6px;
			background-color:gainsboro;
		}
		.current-page {
			background-color: #FFF;
			border: 2px solid teal;
		}
	}
	.observer {
		height: 30px;
		background-color: greenyellow;
	}
</style>