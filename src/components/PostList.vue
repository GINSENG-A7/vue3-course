<template>
	<div v-show="posts.length > 0">
		<h3>Список пользователей</h3>
		<post-item class="post" v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
	</div>
	<h2 v-show="posts.length == 0" class="emptyAlert">
		Список пользователей пуст
	</h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
	components: {
		PostItem,
	},
	props: {
		posts: {
			type: Array,
			required: true,
		}
	}
}
</script>

<style scoped lang="scss">
	h3 {
		padding-top: 15px;
		padding-bottom: 15px;
	}
	.emptyAlert {
		color: darkslateblue;
		text-align: center;
	}
</style>
