export default {
	mounted(el, binding) {
		const options = {
			rootMargin: "0px",
			threshold: 1.0,
		};
		const callback = (entries, observer) => {
			console.log(binding);
			console.log(binding.value[1].lastLoadedCount);
			if (entries[0].isIntersecting && binding.value[1].lastLoadedCount === binding.value[1].limit) {
				binding.value[0]();
			}
		};
		const observer = new IntersectionObserver(callback, options);
		observer.observe(el);
	}, 
	name: "intersection"
}