<template>
    <div class="login">
        <div class="login__header">
            <div class="d-flex flex-column">
                <div class="login__title">Login To Do App</div>
                <div class="login__question">
                    Do not have an account?
                    <router-link :to="{ name: 'signup' }">Create Account</router-link>
                </div>
            </div>
        </div>
        <div class="login__center">
            <form @submit.prevent="handleSubmit">
                <div class="form-group form-field">
                    <div style="position: relative">
                        <input type="email" class="form-control form-input" v-model="state.email" placeholder=" " @blur="v$.email.$touch" />
                        <label class="form-label">Email</label>
                    </div>
                    <span v-if="v$.email.$error" class="text-danger">
                        {{ v$.email.$errors[0].$message }}
                    </span>
                </div>
                <div class="form-group form-field">
                    <div style="position: relative">
                        <input type="password" class="form-control form-input" v-model="state.password" placeholder=" " @blur="v$.password.$touch" />
                        <label class="form-label">Password</label>
                    </div>
                    <span v-if="v$.password.$error" class="text-danger">
                        {{ v$.password.$errors[0].$message }}
                    </span>
                </div>
                <div class="form-check d-flex flex-row">
                    <input type="checkbox" class="form-checkbox" />
                    <label class="form-check-provision">Remember Me</label>
                </div>

                <button class="btn btn-primary">Log In</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import { defineComponent } from "vue";
import { FormData } from "../types/data";
import axios from "axios";
import { useRouter } from "vue-router";
import jwt_decode from "jwt-decode";

export default defineComponent({
    name: "SignUp",
    setup() {
        const state = reactive({
            email: "",
            password: "",
        });
        const rules = computed(() => {
            return {
                email: { required, email },
                password: { required, minLength: minLength(5) },
            };
        });

        const v$ = useValidate(rules, state);

        const router = useRouter();

        const handleSubmit = async () => {
            v$.value.$validate();

            if (!v$.value.$error) {
                const responsive = await axios.post("http://localhost:8081/auth/login", state);
                localStorage.setItem("token", responsive.data.accessToken);
                // axios.defaults.headers.common["Authorization"] = `Bearer ${responsive.data.accessToken}`;
                await router.push("/users/me/tasks/all");
            } else {
                alert("Form failed");
            }
        };

        return {
            state,
            v$,
            rules,
            handleSubmit,
        };
    },
});
</script>

<style>
.login {
    margin: 50px auto 0 auto;
    width: 40%;
    background-color: #fff;
    padding: 40px;
    box-shadow: 0 0 10px rgba(225, 223, 223, 0.1);
}

.login__header {
    width: 60%;
    margin: 0 auto 2rem;
}
.login__title {
    font-size: 32px;
    color: var(--black-color);
    font-weight: 600;
}
.login__question {
    font-size: 14px;
    color: var(--text-color);
}

.login__center {
    width: 100%;
}

.form-input {
    border: 1px solid #eee;
    border-radius: 4px;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    transition: 0.25s ease;
    outline: none;
}

.form-input:focus {
    border-color: var(--border-color);
    outline: none;
    box-shadow: none;
    color: var(--text-color);
}

.form-field {
    position: relative;
}

.form-label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    user-select: none;
    color: #999;
    pointer-events: none;
    transition: 0.25s ease;
    font-size: 16px;
}

.form-input:not(:placeholder-shown) + .form-label,
.form-input:focus + .form-label {
    top: 0;
    padding: 0 10px;
    left: 11px;
    display: inline-block;
    background-color: #fff;
    color: var(--text-color);
}

.form-check {
    padding: 0;
}

.form-checkbox {
    margin-top: 4px;
}

.form-check-provision {
    font-size: 14px;
    color: var(--text-color);
    padding-left: 4px;
}

.login__center button {
    width: 100%;
}
</style>
