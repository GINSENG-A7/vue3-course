import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main";
import UserPage from "@/pages/UserPage";
import About from "@/pages/About";
import PostDetail from "@/pages/PostDetail";
import PostPageWithStore from "@/pages/PostPageWithStore";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi";

const routes = [
	{
		path: "/",
		component: Main
	},
	{
		path: "/posts",
		component: UserPage
	},
	{
		path: "/about",
		component: About
	},
	{
		path: "/posts/:id",
		component: PostDetail
	},
	{
		path: "/store",
		component: PostPageWithStore
	},
	{
		path: "/composition",
		component: PostPageCompositionApi
	}
];

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL),
});

export default router;