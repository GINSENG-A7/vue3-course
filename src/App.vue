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
		async fetchPosts() {
			try {
				this.isPostsLoading = true;
				const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
				this.posts = response.data;
			}
			catch(e) {
				alert("Ошибка сервера");
			}
			finally {
				this.isPostsLoading = false;
			}
		}
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
}
</style>