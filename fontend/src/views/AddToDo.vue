<template>
    <form class="form__add" @submit.prevent="handleSubmit">
        <div class="detail-header__icon d-flex align-items-center" @click="backHomePage">
            <i class="fa-solid fa-arrow-left mr-4"></i>
            <h3>Add New ToDo</h3>
        </div>

        <label class="form__add-name">Name Task</label>
        <input type="text" class="form__add-input" required v-model="newTask.nameTask" />
        <label class="form__add-name">Dealine</label>
        <input type="datetime-local" required class="form__add-input" v-model="newTask.deadline" />
        <label class="form__add-name">Description</label>
        <textarea required v-model="newTask.description"></textarea>
        <button>Add Project</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default defineComponent({
    name: "add-todo",
    data() {
        return {
            newTask: {
                nameTask: "",
                deadline: "",
                description: "",
            },
        };
    },
    methods: {
        async handleSubmit() {
            let todo = {
                nameTask: this.newTask.nameTask,
                deadline: this.newTask.deadline + ":00.000Z",
                description: this.newTask.description,
            };

            const res = await axios.post("http://localhost:8081/users/me/tasks/store", todo, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            console.log(res);
            await this.$router.push("/users/me/tasks/all");
        },
        async backHomePage() {
            await this.$router.push("/users/me/tasks/all");
        },
    },
    computed: {
        dateLocal() {
            return this.newTask.deadline.substring(0, 16);
        },
    },
});
</script>

<style>
.form__add {
    width: 50%;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-top: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.form__add-name {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
}
.form__add-input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
}
textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
}
form button {
    display: block;
    margin: 20px auto 0;
    background-color: var(--primary-color);
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
}
</style>
