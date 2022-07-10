<template>
	<div class="app contaner">
		<h1>Страница с постами</h1>
		<my-button @click="showDialog">Создать пользователя</my-button>
		<my-dialog v-model:show="dialogVisible">			
			<post-form @create="createPost" style="margin-top: 30px"/>
		</my-dialog>
		<post-list :posts="posts" @remove="removePost" v-if="!isPostsLoading" style="margin-top: 20px"/>
		<div class="loading" v-else>Посты загружаются...</div>
	</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "./components/UI/MyButton.vue";
import axious from "axios";
import axios from 'axios';
export default {
	components: {
    PostList,
    PostForm,
    MyButton
},
	data() {
		return {
			posts: [],
			dialogVisible: false,
			isPostsLoading: false,
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
	}
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
.contaner {
	margin: 0 auto;
	width: 95%;
}
</style>