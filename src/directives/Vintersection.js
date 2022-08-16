export default {
	mounted(el, binding) {
		const options = {
			rootMargin: "0px",
			threshold: 1.0,
		};
		const callback = (entries, observer) => {
			console.log(binding.value);
			//vanilla case
			if (binding.value.length === 2) {
				console.log(binding.value[1].lastLoadedCount);
				if (entries[0].isIntersecting && binding.value[1].lastLoadedCount === binding.value[1].limit) {
					console.log(binding.value[0]);
					binding.value[0]();
				}
			}
			//store case
			else if (binding.value.length > 2) {
				console.log(binding.value[1]);
				console.log(binding.value[2]);
				if (entries[0].isIntersecting && binding.value[1] === binding.value[2]) {
					console.log(binding.value[0]);
					binding.value[0]();
				}
			}


		};
		const observer = new IntersectionObserver(callback, options);
		observer.observe(el);
	}, 
	name: "intersection"
}