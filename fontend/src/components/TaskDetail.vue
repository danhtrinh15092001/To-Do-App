<template>
    <div class="task__detail mt-3">
        <div class="task__detail-header d-flex flex-row mt-3">
            <div class="detail-header__icon" @click="backHomePage">
                <i class="fa-solid fa-arrow-left"></i>
            </div>
            <div class="detail-header__title ml-2">Task Detail</div>
        </div>
        <div class="task__detail-center mt-5">
            <div class="detail-center__header d-flex flex-row align-items-center">
                <input type="checkbox" class="detail-center__checkbox mr-3" />
                <div class="detail-center__title">{{ taskDetail.nameTask }}</div>
            </div>
            <div class="detail-center__main">
                <div class="d-flex flex-column mt-3">
                    <div class="center__main-label">Due Date</div>
                    <div class="center__main-info">{{ taskDetail.deadline }}</div>
                </div>
                <div class="d-flex flex-column mt-3">
                    <div class="center__main-label">Description</div>
                    <div class="center__main-info">
                        {{ taskDetail.description }}
                    </div>
                </div>
                <div class="d-flex flex-column mt-3">
                    <div class="center__main-label">Subtask</div>
                    <div class="center__main-info">
                        <SubTask :id="id"></SubTask>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import SubTask from "./SubTask.vue";
export default defineComponent({
    name: "task-detail",
    data() {
        return {
            taskDetail: {
                nameTask: "",
                deadline: "",
                description: "",
            },

            completionLevel: 0,
        };
    },
    props: ["id"],
    methods: {
        async backHomePage() {
            await this.$router.push("/users/me/tasks/all");
        },
    },
    async created() {
        const res = await axios.get("http://localhost:8081/tasks/" + this.id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        this.taskDetail.nameTask = res.data.nameTask;
        this.taskDetail.deadline = res.data.deadline;
        this.taskDetail.description = res.data.description;
        this.taskDetail.deadline = new Date(res.data.deadline).toDateString();
    },

    components: { SubTask },
});
</script>

<style>
.task__detail {
    width: 30%;
    margin: auto;
    /* background-color: rgb(246, 242, 242); */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 16px 16px;
}

.task__detail-header {
}

.detail-header__icon {
    cursor: pointer;
    padding: 0 4px;
}

.detail-header__icon {
    font-size: 24px;
}

.detail-header__title {
    font-size: 24px;
    font-weight: 600;
}

.detail-header__delete {
    font-size: 24px;
}

.detail-center__header {
}

.detail-center__checkbox {
    outline: none;
    border: none;
    color: var(--text-color);
    width: 20px;
    height: 20px;
}

.detail-center__title {
    font-size: 20px;
    font-weight: 550;
}

.center__main-label {
    color: var(--text-color);
    font-size: 16px;
}

.center__main-info {
    font-weight: 550;
}
</style>
