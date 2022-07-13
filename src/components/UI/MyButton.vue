<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: "my-button",
}
</script>

<style scoped lang="scss">
	.btn {
		padding: 10px 15px;
		background: none;
		color: teal;
		background-color: #FFF;
		border: 2px solid teal;
		transition: ease 0.3s;
		&:hover {
			background-color: teal;
			color: #FFF;
		}
		&:active {
			background-color: darkslategrey;
			color: #FFF;
		}
	}
</style>