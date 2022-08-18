export default {
	mounted(el, binding) {
		const options = {
			rootMargin: "0px",
			threshold: 1.0,
		};
		const callback = (entries, observer) => {

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
				console.log(binding.value[0]);
				console.log(binding.value[1]);
				console.log(binding.value[2]);
				if (entries[0].isIntersecting && binding.value[1] === binding.value[2]) {
					binding.value[0]();
				}
			}
			//composition API case
			else if (binding.value.length < 2) {
				console.log(binding.value[0]);
				if (entries[0].isIntersecting && binding.value[0].lastLoadedCount === binding.value[0].limit) {
					binding.value[0].getMorePosts();
				}
			}


		};
		const observer = new IntersectionObserver(callback, options);
		observer.observe(el);
	}, 
	name: "intersection"
}