import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import login from "../components/login.vue";
import signup from "../components/signup.vue";
import homepage from "../views/HomePage.vue";
import tasksdetail from "../components/TaskDetail.vue";
import addtodo from "../views/AddToDo.vue";
import edittodo from "../views/EditToDo.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/login",
        name: "login",
        component: login,
    },
    {
        path: "/signup",
        name: "signup",
        component: signup,
    },
    {
        path: "/users/me/tasks/all",
        name: "homepage",
        component: homepage,
    },
    {
        path: "/tasks-detail/:id",
        name: "tasks-detail",
        component: tasksdetail,
        props: true,
    },
    {
        path: "/add",
        name: "add-todo",
        component: addtodo,
    },
    {
        path: "/edit/:id",
        name: "edit-todo",
        component: edittodo,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
