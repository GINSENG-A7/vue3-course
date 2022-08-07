<template>
	<div class="post">
		<div>
			<div>{{ post.id }}</div>
			<div><strong>Название:</strong> {{post.title}} </div>
			<div><strong>Описание:</strong> {{post.body}} </div>
		</div>
		<div class="post__btns">
			<my-button class="btn" @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
			<my-button class="btn" @click="$emit('remove', post)">Удалить</my-button>
		</div>
	</div>
	
</template>

<script>
export default {
	props: {
		post: {
			type: Object,
			required: true,
		}
	}
}
</script>

<style lang="scss" scoped>
	.post {
		padding: 15px;
		border: 2px solid teal;
		margin-bottom: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color:gainsboro;
		&__btns {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.btn {
				width: 100%;
			}	
		}
	}
</style>