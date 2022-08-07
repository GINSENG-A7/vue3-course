<template>
	<form action="" @submit.prevent>
		<h3>Создание поста</h3>
		<my-input placeholder="Название" v-model="post.title" v-focus/>
		<my-input placeholder="Описание" v-model="post.body"/>
		<my-button @click="createPost">Создать</my-button>
	</form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: "",
                body: "",
            }
        };
    },
    methods: {
        createPost(event) {
            this.post.id = Date.now();
			let newPost = JSON.parse(JSON.stringify(this.post))
            this.$emit("create", newPost);
            this.post = {
                title: "",
                body: "",
            };
        }
    },
	watch: {
		post: {
			handler(newValue) {
				console.log(newValue);
			},
			deep: true,
		}
	}
}
</script>

<style scoped>

</style>