<template>
    <div class="" style="padding: 20px">
        <div class="d-flex">
            <div class="" style="background-color: rgb(233, 233, 237); padding: 32px 20px; border-radius: 10px; height: 95vh">
                <div class="d-flex align-items-center mb-5">
                    <i class="fa-solid fa-table-cells" style="font-size: 24px; color: #000; margin-right: 16px"></i>
                    <div class="" style="font-size: 20px; color: #000; font-weight: 700">Projects</div>
                </div>
                <div style="background-color: #fff; border-radius: 10px">
                    <ul style="list-style-type: none; padding: 0 40px 0 20px" class="">
                        <li class="d-flex align-items-center" style="padding: 14px 80px 14px 8px">
                            <i class="fa-solid fa-tablet" style="margin-right: 12px"></i>
                            <div>Dashboard</div>
                        </li>
                        <li class="d-flex align-items-center default-hover" style="padding: 14px 110px 14px 8px; cursor: pointer">
                            <i class="fa-solid fa-check-double" style="margin-right: 12px"></i>
                            <div>MyTask</div>
                        </li>
                        <li class="d-flex align-items-center" style="padding: 14px 80px 14px 8px">
                            <i class="fa-solid fa-gear" style="margin-right: 12px"></i>
                            <div>Setting</div>
                        </li>
                    </ul>
                </div>
                <div>
                    <div
                        class="d-flex align-items-center"
                        style="margin-top: 200px; padding: 8px 0 8px 8px; border-radius: 10px; background-color: #ddd; cursor: pointer; position: relative"
                        @click="show = !show"
                    >
                        <img
                            src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/120836647_113249040545341_5445297340173352633_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=tGxdzjhN8OQAX-8tczI&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT94mRFylE1fGJWSfK5BoHoBGcMsTCF1GEktbc9PO9QdlQ&oe=62965E37"
                            alt=""
                            style="height: 50px; weight: 50px; margin-right: 8px"
                            class="rounded-circle"
                        />
                        <div>
                            <div class="" style="font-weight: 500; font-size: 18px">{{ user.name }}</div>
                            <div style="font-size: 14px">Frontend Developer</div>
                        </div>
                        <div
                            class="todo__option"
                            style="font-size: 20px; position: absolute; top: 0; right: 0; transform: translateY(-100%); background-color: #ddd; padding: 8px; border-radius: 8px"
                            v-if="show"
                            @click="handleClick"
                        >
                            <div class="todo__option-menu d-flex flex-column">
                                <div class="option-menu__list d-flex align-items-center">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    <span class="option-menu__name">Logout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="" style="padding: 32px 0 0 20px; position: relative">
                <div class="d-flex justify-content-between">
                    <div style="font-size: 28px; font-weight: 700; margin-right: 35rem">My Task</div>
                    <div class="">
                        <input type="text" class="form-control" v-model="search" placeholder="Search ToDo" aria-label="Search ToDo" aria-describedby="basic-addon2" />
                    </div>
                </div>
                <div class="pt-4 px-3" style="border-bottom: 1px solid #ccc">
                    <FilterNav @filterChange="current = $event" :current="current"></FilterNav>
                </div>
                <div class="home__center d-flex flex-wrap">
                    <div v-for="todo in filteredSearch" :key="todo.nameTask" class="todo__list mt-3">
                        <SingleProject :user="user" :todo="todo" @delete="handleDelete"></SingleProject>
                    </div>
                </div>
                <router-link :to="{ name: 'add-todo' }">
                    <div style="position: fixed; padding: 24px; border-radius: 10px; background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); cursor: pointer; bottom: 40px; right: 50px">
                        <i class="fa-solid fa-plus" style="font-size: 32px"></i>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <!-- <div v-if="user" class="home__page mt-3 flex">
        <div class="home__header d-flex flex-row justify-content-between">
            <div class="home__header-title">To Do List</div>
            <div class="home__header-search">
                <div class="input-group">
                    <input type="text" class="form-control" v-model="search" placeholder="Search ToDo" aria-label="Search ToDo" aria-describedby="basic-addon2" />
                </div>
            </div>
        </div>
        <div class="home__nav pt-3 px-3">
            <FilterNav @filterChange="current = $event" :current="current"></FilterNav>
        </div>
        <div class="home__center">
            <div v-for="todo in filteredSearch" :key="todo.nameTask" class="todo__list mt-3">
                <SingleProject :user="user" :todo="todo" @delete="handleDelete"></SingleProject>
            </div>
        </div>
        <div class="home__footer-add">
            <div class="todo__add">
                <router-link :to="{ name: 'add-todo' }">
                    <div class="todo__add-btn d-flex flex-row justify-content-center">
                        <div class="add-btn__icon mr-3">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                        <div class="add-btn__title">Add ToDo</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import SingleProject from "../components/SingleProject.vue";
import FilterNav from "../components/FilterNav.vue";
import { Task, TaskDetail, TaskStatus } from "../types/data";

export default defineComponent({
    name: "home-page",
    props: ["user"],
    components: { SingleProject, FilterNav },
    data() {
        return {
            search: "",
            todolist: [],
            current: "all",
            show: false,
        };
    },

    async created() {
        const res = await axios.get("http://localhost:8081/users/me/tasks/all", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        this.todolist = res.data;
        this.todolist.map((task: Task) => {
            const dateTransform = new Date(task.deadline).toDateString();
            task.deadline = dateTransform;
        });
    },
    computed: {
        filteredSearch(): Task[] {
            const statusTask = this.todolist.map((task: Task) => {
                const countFinishedTask = task.tasksDetail.reduce((result: number, taskDetail: TaskDetail) => {
                    return taskDetail.state ? result + 1 : result;
                }, 0);

                const numTaskDetail = task.tasksDetail.reduce((result: number, taskDetail: TaskDetail) => {
                    return result + 1;
                }, 0);

                if (numTaskDetail === 0) {
                    return TaskStatus.ToDo;
                } else if (countFinishedTask === numTaskDetail) {
                    return TaskStatus.Done;
                } else if (countFinishedTask !== numTaskDetail) {
                    return TaskStatus.InProgress;
                }
            });

            const newList = this.todolist.map((task: Task, index: number) => {
                return {
                    ...task,
                    status: statusTask[index],
                };
            });

            // return this.todolist.filter((todo: Task) => todo.nameTask.includes(this.search));
            return newList.filter((todo: Task) => todo.nameTask.includes(this.search));
        },
    },
    methods: {
        handleDelete(id: any) {
            this.todolist = this.todolist.filter((todo: Task) => {
                return todo.id !== id;
            });
        },
        async handleClick() {
            localStorage.removeItem("token");
            await this.$router.push("/login");
        },
    },
});
</script>

<style>
.default-hover {
    cursor: pointer;
    color: blue;
    background-color: #f6f7f8;
    border-radius: 10px;
}
/* .home__page {
    width: 50%;
    margin: auto;
    margin-bottom: 2rem;
    background-color: rgb(247, 247, 247);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.home__header {
    background-color: var(--white-color);
    padding: 16px 16px;
    border-radius: 10px;
}

.home__header-title {
    font-size: 28px;
}

.home__header-search {
}

.home__header-search.open {
}

.header-search__input {
}

.header-search__btn {
    border-radius: 10px;
}

.home__footer-add {
    padding: 16px 16px;
}

.home__nav {
    border-bottom: 1px solid #ccc;
    background-color: var(--white-color);
}

.home__nav button {
    background: none;
    border: none;
    color: #bbb;
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
}

.home__nav button.active {
    color: #555;
}

.todo__list {
    padding: 8px 16px;
}

.todo__add {
    padding: 10px 16px;
    border-radius: 10px;
    background-color: var(--primary-color);
}

.todo__add a:hover {
    text-decoration: none;
}

.todo__add-btn {
    color: var(--white-color);
} */
</style>
