<template>
    <input type="checkbox" class="info__list-checkbox" @click="toggleComplete" />
    <div class="list-name ml-3" :class="{ complete: subtask.state }">
        {{ subtask.nameTaskDetail }}
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { State } from "./../types/data";
import { defineComponent, computed } from "vue";
export default defineComponent({
    data() {
        return {
            state: false,
        };
    },
    props: ["subtask"],
    methods: {
        async toggleComplete() {
            await axios
                .put(
                    "http://localhost:8081/tasks-detail/" + this.subtask.id,
                    {
                        state: !this.subtask.state,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                )
                .then(() => {
                    this.$emit("completed", this.subtask.id);
                });
        },
    },
});
</script>

<style>
.list-name.complete {
    text-decoration: line-through;
}

.info__list-checkbox[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background-color: #d5d5d5;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: baseline;
    outline: none;
}

.info__list-checkbox[type="checkbox"]:after {
    content: "\f00c";
    font-weight: 900;
    font-size: 20px;
    color: white;
    font-family: "Font Awesome 5 Free";
    display: none;
}

.info__list-checkbox[type="checkbox"]:hover {
    background-color: #a5a5a5;
}

.info__list-checkbox[type="checkbox"]:checked {
    background-color: #5bcd3e;
}

.info__list-checkbox[type="checkbox"]:checked::after {
    display: block;
}
</style>
