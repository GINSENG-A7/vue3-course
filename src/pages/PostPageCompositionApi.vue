<template>
	<div class="app container">
		<h1>Страница с постами</h1>
		<my-input placeholder="Поиск..." v-model="searchQuery"></my-input>
		<div class="container__btns">
			<my-button @click="showDialog">Создать пользователя</my-button>
			<my-select v-model="selectedSort" :options="sortOptions"/>
		</div>
		<my-dialog v-model:show="dialogVisible">			
			<post-form @create="createPost" style="margin-top: 30px"/>
		</my-dialog>
		<post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" style="margin-top: 20px"/>
		<div class="loading" v-else>Посты загружаются...</div>
		<!-- <div class="page__wrapper">
			<div class="page" :class="{'current-page': page == pageNumber}" v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)">{{ pageNumber }}</div>
		</div> -->

		<!-- <div ref="observer" class="observer"></div> -->
		<div v-intersection="[loadMorePosts, this]" class="observer"></div>
	</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { usePosts } from "@/hooks/usePosts"
import { useSortedPosts } from "@/hooks/useSortedPosts"
import { useSortedAndSearchedPosts } from "@/hooks/useSortedAndSearchedPosts"
export default {
	components: {
		PostList,
		PostForm,
	},
	data() {
		return {
			dialogVisible: false,
			sortOptions: [
				{value: "title", name: "По названию"},
				{value: "body", name: "По содержимому"},
			],
			// lastLoadedCount: 0,
		}
	},
	setup(props) {
		const {posts, isPostsLoading, totalPages} = usePosts(10);
		const {sortedPosts, selectedSort} = useSortedPosts(posts);
		const {sortedAndSearchedPosts, searchQuery} = useSortedAndSearchedPosts(sortedPosts)
		return {
			posts,
			totalPages,
			isPostsLoading,
			sortedPosts,
			selectedSort,
			searchQuery,
			sortedAndSearchedPosts,
		}
	}
}
</script>

<style lang="scss">
	.container__btns {
		display: flex;
		justify-content: space-between;
	}
	.page__wrapper {
		display: flex;
		margin-top: 15px;
		margin-bottom: 10px;
		.page {
			border: 2px solid black;
			padding: 6px;
			background-color:gainsboro;
		}
		.current-page {
			background-color: #FFF;
			border: 2px solid teal;
		}
	}
	.observer {
		height: 30px;
		background-color: greenyellow;
	}
</style>