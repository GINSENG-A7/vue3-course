<template>
	<navbar></navbar>
	<div class="container">
		<router-view></router-view>
	</div>
</template>

<script>
export default {

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
}
</style>