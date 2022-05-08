<template>
    <div>
        <!-- <Nav :user="user"></Nav> -->
        <main>
            <router-view :user="user" />
        </main>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Nav from "./components/nav.vue";
export default defineComponent({
    components: { Nav },
    data() {
        return {
            user: [],
        };
    },
    async created() {
        const response = await axios.get("http://localhost:8081/users/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        this.user = response.data;
    },
    methods: {},
});
</script>
<style>
:root {
    --white-color: #f5f7fb;
    --primary-color: #3399ff;
    --border-color: #ccc;
    --black-color: #000;
    --text-color: rgb(129, 128, 128);
}

body {
    background-color: var(--white-color);
}
#app {
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
