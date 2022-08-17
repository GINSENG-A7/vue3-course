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
			//test case
			else if (binding.value.length < 2) {
				console.log(binding.value[0]);
				if (entries[0].isIntersecting && binding.value[1] === binding.value[2]) {
					binding.value[0].getMorePosts(
						this.limit.value, 
						this.page.value,
						this.sortedAndSearchedPosts.value,
						this.totalPages.value,
						this.isPostsLoading.value,
						this.lastLoadedCount.value,
					);
				}
			}


		};
		const observer = new IntersectionObserver(callback, options);
		observer.observe(el);
	}, 
	name: "intersection"
}