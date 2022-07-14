<template>
	<div class="app container">
		<h1>Страница с постами</h1>
		<my-input placeholder="Поиск..." v-model="searchQuery"></my-input>
		<div class="container__btns">
			<my-button @click="showDialog">Создать пользователя</my-button>
			<my-select v-model="selectedSort" :options="sortOptions"/>
		</div>
		<my-dialog v-model:show="dialogVisible">			
			<post-form @create="createPost" style="margin-top: 30px"/>
		</my-dialog>
		<post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" style="margin-top: 20px"/>
		<div class="loading" v-else>Посты загружаются...</div>
		<!-- <div class="page__wrapper">
			<div class="page" :class="{'current-page': page == pageNumber}" v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)">{{ pageNumber }}</div>
		</div> -->
		<div ref="observer" class="observer"></div>
	</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios';
import MyInput from "./components/UI/MyInput.vue";
export default {
	components: {
    PostList,
    PostForm,
    MyInput
},
	data() {
		return {
			posts: [],
			dialogVisible: false,
			isPostsLoading: false,
			selectedSort: "",
			searchQuery: "",
			page: 1,
			limit: 10,
			totalPages: 0,
			lastLoadedCount: 0,
			sortOptions: [
				{value: "title", name: "По названию"},
				{value: "body", name: "По содержимому"},
			],
		}
	},
	methods: {
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
		async fetchPosts() {
			try {
				this.isPostsLoading = true;
				const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
					params: {
						_page: this.page,
						_limit: this.limit,
					} 
				});
				this.totalPages = Math.ceil(response.data.length / this.limit);
				this.posts = response.data;
				this.lastLoadedCount = response.data.length;
			}
			catch(e) {
				alert("Ошибка сервера");
			}
			finally {
				this.isPostsLoading = false;
			}
		},
		async loadMorePosts() {
			try {
				this.page += 1;
				// this.isPostsLoading = true;
				const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
					params: {
						_page: this.page,
						_limit: this.limit,
					} 
				});
				this.totalPages = Math.ceil(response.data.length / this.limit);
				this.posts = [...this.posts, ...response.data];
				this.lastLoadedCount = response.data.length;
			}
			catch(e) {
				alert("Ошибка сервера");
			}
		}
	},
	mounted() {
		this.fetchPosts();
		const options = {
			rootMargin: "0px",
			threshold: 1.0,
		};
		const callback = (entries, observer) => {
			console.log(this.lastLoadedCount);
			if (entries[0].isIntersecting && this.lastLoadedCount === this.limit) {
				this.loadMorePosts();
			}
		};
		const observer = new IntersectionObserver(callback, options);
		observer.observe(this.$refs.observer);
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
		sortedPosts() {
			return [...this.posts].sort((postA, postB) => {
				return postA[this.selectedSort]?.localeCompare(postB[this.selectedSort]);
			});
		},
		sortedAndSearchedPosts() {
			return this.sortedPosts.filter(({title, body}) => {
				return (title + " " + body).toLowerCase().includes(this.searchQuery.toLowerCase());
			});
		}
	},
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	h1 {
		padding-top: 20px;
		padding-bottom: 20px;
	}
}
.container {
	margin: 0 auto;
	width: 95%;
	&__btns {
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
}
</style>