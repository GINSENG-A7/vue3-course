<template>
	<div class="navbar">
		<div class="navbar__logo" @click="this.$router.push({ path: '/' })">Vue 3</div>
		<div class="navbar__btns">
			<my-button @click="this.$router.push('/posts')">Посты</my-button>
			<my-button @click="this.$router.push('/about')">О сайте</my-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "navbar",
}
</script>

<style lang="scss" scoped>
.navbar {
	height: 50px;
	margin: 0 auto;
	padding: 0 2.5%;
	width: 100%;
	background-color: teal;
	box-shadow: 2px 2px 4px gray;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&__logo {
		color: #FFF;
		width: max-content;
		font-size: 40px;
	}
	&__btns {
		.btn {
			margin: 0 5px;
		}
	}
}
</style>