<template>
    <div>
        <div v-for="subtask in filterSubtask" :key="subtask.id">
            <div class="main-info__list d-flex flex-row align-items-center mt-3">
                <toggleCompletedVue :subtask="subtask" @completed="handleComplete"></toggleCompletedVue>
            </div>
        </div>
        <div class="input__add mt-4">
            <input type="text" placeholder="+ Add a subtask" v-model="nameTaskDetail" class="input__add-subtask" @keyup.enter="handleInput" style="background-color: #f5f7fb" />
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import toggleCompletedVue from "./toggleCompleted.vue";
import { TaskDetail } from "../types/data";
import { State } from "./../types/data";

export default defineComponent({
    data() {
        return {
            subtasks: [],
            nameTaskDetail: "",
        };
    },
    components: {
        toggleCompletedVue,
    },
    props: ["id"],
    async created() {
        const res = await axios.get("http://localhost:8081/tasks/" + this.id + "/tasks_detail/all", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        this.subtasks = res.data;
    },
    computed: {
        filterSubtask(): TaskDetail[] {
            return this.subtasks.filter((todo: TaskDetail) => todo.nameTaskDetail);
        },
    },
    methods: {
        async handleInput() {
            const res = await axios.post(
                "http://localhost:8081/tasks/" + this.id + "/tasks_detail/store",
                {
                    nameTaskDetail: this.nameTaskDetail,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            const subtask: TaskDetail = res.data;
            this.filterSubtask.push(subtask);
            this.nameTaskDetail = "";
        },
        handleComplete(id: number) {
            let subTask: any = this.subtasks.find((subtask: TaskDetail) => {
                return subtask.id === id;
            });

            subTask.state = !subTask.state;
        },
    },
});
</script>

<style>
.input__add-subtask {
    border: none;
    outline: none;
}

.main-info__list {
    border-bottom: 1px solid var(--border-color);
}
</style>
