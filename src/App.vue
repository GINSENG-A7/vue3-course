<template>
	<div class="app contaner">
		<h1>Страница с постами</h1>
		<my-button @click="showDialog">Создать пользователя</my-button>
		<my-dialog v-model:show="dialogVisible">			
			<post-form @create="createPost" style="margin-top: 30px"/>
		</my-dialog>
		<post-list :posts="posts" @remove="removePost" style="margin-top: 20px"/>
	</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "./components/UI/MyButton.vue";
export default {
	components: {
    PostList,
    PostForm,
    MyButton
},
	data() {
		return {
			posts: [ 
				{id: 1, title: "JavaScript", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eum exercitationem quo voluptas suscipit amet est mollitia laudantium, similique enim! Eos amet corporis architecto voluptate. Pariatur possimus fuga totam dolore."},
				{id: 2, title: "JavaScript_2", body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis fuga corrupti cum numquam dicta repellat nobis porro reiciendis officiis vel, harum tempora quidem neque ea iusto sapiente, temporibus doloremque nemo."},
				{id: 3, title: "JavaScript_3", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis corrupti doloribus doloremque vitae voluptatibus consequuntur delectus autem qui nesciunt non nisi consectetur rerum laborum, nostrum natus, dolorum, magnam cupiditate quas?"} 
			],
			dialogVisible: false,
			modificatorValue: ''
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
		async fetchUsers() {
			
		}
	}
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.contaner {
	margin: 0 auto;
	width: 95%;
}
</style>