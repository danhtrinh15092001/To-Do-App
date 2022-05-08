<template>
    <div class="home">
        <div class="d-flex flex-column home__header">
            <div class="home__title">WELCOME TO THE TODO-APP</div>
            <div class="home__description">Increase your productivity by managing your personal and team task and do them based on the highest priority</div>
        </div>

        <div class="d-flex justify-content-center home__center">
            <router-link :to="{ name: 'login' }">
                <div class="home__start">GET STARTED <i class="fa-solid fa-arrow-right"></i></div>
            </router-link>
        </div>

        <div class="d-flex justify-content-between home__footer">
            <div class="home__text">Privacy Policy</div>
            <div class="home__text">Copyright@Tract 2022</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "HomeView",
    components: {},
});
</script>

<style>
.home {
    margin-top: 100px;
}
.home__header {
    justify-content: center;
    align-items: center;
}
.home__title {
    font-size: 32px;
    font-weight: 600;
    color: var(--z-color);
}

.home__description {
    font-size: 18px;
    color: var(--black-color);
}

.home__center {
    margin-top: 20px;
}

.home__start {
    font-size: 18px;
    font-weight: 600;
    color: var(--white-color);
    padding: 10px 28px;
    background-color: var(--primary-color);
    border-radius: 10px;
}

.home__start:hover {
    background-color: #0073e6;
    cursor: pointer;
}
.home__center a:hover {
    text-decoration: none;
}

.home__footer {
    margin-top: 200px;
    padding: 0 40px;
}

.home__text {
    color: rgb(129, 125, 125);
}
</style>
