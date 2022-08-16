import axios from 'axios';

export const postModule = {
	state: () => ({
		posts: [],
		isPostsLoading: false,
		selectedSort: "",
		searchQuery: "",
		page: 1,
		limit: 10,
		totalPages: 0,
		lastLoadedCount: 0,
		sortOptions: [
			{value: "title", name: "По названию"},
			{value: "body", name: "По содержимому"},
		],
	}),
	getters: {
		sortedPosts(state) {
			return [...state.posts].sort((postA, postB) => {
				return postA[state.selectedSort]?.localeCompare(postB[state.selectedSort]);
			});
		},
		sortedAndSearchedPosts(state, getters) {
			return getters.sortedPosts.filter(({title, body}) => {
				return (title + " " + body).toLowerCase().includes(state.searchQuery.toLowerCase());
			});
		},
	},
	mutations: {
		setPosts(state, posts) {
			state.posts = posts;
		},
		setLoading(state, bool) {
			state.isPostsLoading = bool;
		},
		setPage(state, page) {
			state.page = page;
		},
		setSelectedSort(state, selectedSort) {
			state.selectedSort = selectedSort;
		},
		setSearchQuery(state, searchQuery) {
			state.searchQuery = searchQuery;
		},
		setTotalPages(state, totalPages) {
			state.totalPages = totalPages;
		},
		setLastLoadedCount(state, lastLoadedCount) {
			state.lastLoadedCount = lastLoadedCount;
		},


	},
	actions: {
		async fetchPosts({state, commit}) {
			try {
				commit("setLoading", true);
				const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
					params: {
						_page: state.page,
						_limit: state.limit,
					} 
				});
				commit("setTotalPages", Math.ceil(response.data.length / state.limit));
				commit("setPosts", response.data);
				commit("setLastLoadedCount", response.data.length);
				console.log(state.limit);
				console.log(state.lastLoadedCount);
			}
			catch(e) {
				alert("Ошибка сервера");
			}
			finally {
				commit("setLoading", false);
			}
		},
		async loadMorePosts() {
			try {
				commit("setPage", state.page + 1);
				// this.isPostsLoading = true;
				const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
					params: {
						_page: state.page,
						_limit: state.limit,
					} 
				});
				commit("setTotalPages", Math.ceil(response.data.length / state.limit));
				commit("setPosts", [...state.posts, ...response.data]);
				commit("setLastLoadedCount", response.data.length);
			}
			catch(e) {
				console.log(e);
				alert("Ошибка сервера");
			}
		}
	},
	namespaced: true,
}