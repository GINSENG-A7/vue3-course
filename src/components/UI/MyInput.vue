<template>
	<input class="input" type="text" @input="updateInput" :value="modelValue">
</template>

<script>
export default {
	name: "my-input",
	props: {
		modelValue: [String, Number],
	},
	methods: {
		updateInput(event) {
			this.$emit("update:modelValue", event.target.value)
		}
	}
}
</script>

<style scoped>
	.input {
		width: 100%;
		border: 2px solid teal;
		padding: 10px 15px;
		margin-top: 15px;
		margin-bottom: 15px;
	}
</style>