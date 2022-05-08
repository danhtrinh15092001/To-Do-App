<template>
    <header class="header d-flex justify-content-between align-items-center">
        <div @click="handleSwitchPage" style="cursor: pointer">
            <div class="d-flex header__left">
                <div class="header__title">TO DO APP</div>
            </div>
        </div>
        <div class="d-flex header__right" v-if="user.length === 0">
            <router-link :to="{ name: 'login' }"><div class="header__login">Login</div></router-link>

            <router-link :to="{ name: 'signup' }"><div class="header__signUp">Sign Up</div></router-link>
        </div>
        <div class="d-flex header__right" v-if="user.length !== 0">
            <a href="#" class="nav-link" @click="handleClick"><div class="header__login">Logout</div></a>
        </div>
    </header>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: "Nav",
    data() {
        return {
            hasToken: false,
        };
    },
    props: ["user"],
    methods: {
        async handleClick() {
            localStorage.removeItem("token");
            await this.$router.push("/login");
        },

        async handleSwitchPage() {
            if (localStorage.getItem("token")) {
                await this.$router.push("/users/me/tasks/all");
            } else {
                await this.$router.push("/");
            }
        },
    },
});
</script>
<style>
.header {
    padding: 40px 40px;
    height: 62px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.header a:hover {
    text-decoration: none;
}

.header__left {
    font-weight: 600;
}

.header__logo {
    margin-right: 4px;
    color: var(--primary-color);
}

.header__title {
    color: var(--primary-color);
}

.header__right {
    font-weight: 600;
}
.header__login {
    margin-right: 22px;
}

.header__login,
.header__signUp {
    padding: 10px 16px;
    border-radius: 10px;
    background-color: var(--primary-color);
    color: var(--white-color);
}

.header__login:hover,
.header__signUp:hover {
    background-color: #0073e6;
    cursor: pointer;
}
</style>
