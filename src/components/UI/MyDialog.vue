<template>
	<div class="myDialog" v-if="show" @click.stop="hideDialog">
		<div @click.stop class="myDialog__content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
	name:"my-dialog",
	mixins: [toggleMixin],
}
</script>

<style lang="scss">
	.myDialog {
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.493);
		position: fixed;
		display: flex;
		z-index: 2;
		&__content {
			margin: auto;
			background: white;
			border-radius: 12px;
			min-height: 50px;
			min-width: 300px;
			padding: 10px;
		}
		h3 {
			text-align: center;
		}
		.btn {
			width: 100%;
			border-end-end-radius: 12px;
			border-end-start-radius: 12px;
		}
	}
</style>