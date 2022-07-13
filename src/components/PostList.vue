<template>
	<div v-show="posts.length > 0">
		<h3>Список пользователей</h3>
		<transition-group name="post-list">
			<post-item class="post" v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
		</transition-group>
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
	.post-list {
		&-item {
			display: inline-block;
			// margin-right: 10px;
		}
		&-enter-active, &-leave-active {
			transition: all 0.4s ease;
		}
		&-enter-from{
			opacity: 0;
			transform: translateX(-130px);
		} 
		&-leave-to {
			opacity: 0;
			transform: translateX(130px);
		}
		&-move {
			transition: transform 0.4s ease;
		}
	}

</style>
