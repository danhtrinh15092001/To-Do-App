<template>
    <div class="signup">
        <div class="signup__header">
            <div class="d-flex flex-column">
                <div class="signup__title">Sign Up.</div>
                <div class="signup__question">
                    Already A Member?
                    <router-link :to="{ name: 'login' }">Login</router-link>
                </div>
            </div>
        </div>

        <div class="signup__center">
            <form @submit.prevent="handleSubmit">
                <div class="form-group form-field">
                    <div style="position: relative">
                        <input type="text" class="form-control form-input" v-model="state.name" placeholder=" " @blur="v$.name.$touch" />
                        <label class="form-label">User name</label>
                    </div>
                    <span v-if="v$.name.$error" class="text-danger">
                        {{ v$.name.$errors[0].$message }}
                    </span>
                </div>
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
                <div class="form-group form-field">
                    <div style="position: relative">
                        <input type="password" class="form-control form-input" v-model="state.confirmpassword" placeholder=" " @blur="v$.confirmpassword.$touch" />
                        <label class="form-label">Confirm Password</label>
                    </div>
                    <span v-if="v$.confirmpassword.$error" class="text-danger">
                        {{ v$.confirmpassword.$errors[0].$message }}
                    </span>
                </div>
                <div class="form-check d-flex flex-row">
                    <input type="checkbox" class="form-checkbox" required />
                    <label class="form-check-provision">By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy</label>
                </div>

                <button class="btn btn-primary">Create Account</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import useValidate, { ValidationArgs } from "@vuelidate/core";
import { required, email, minLength, maxLength, sameAs, alpha } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import { defineComponent } from "vue";
import { FormData } from "../types/data";
import axios from "axios";
import { useRouter } from "vue-router";
export default defineComponent({
    name: "SignUp",
    setup() {
        const state = reactive({} as FormData);
        const rules = computed(() => {
            return {
                name: { required, alpha },
                // lastname: { required, alpha },
                email: { required, email },
                password: { required, minLength: minLength(5) },
                confirmpassword: { required, sameAs: sameAs(state.password) },
            };
        });

        // const rules = {
        //     name: { required, alpha, minLength: minLength(4) },
        //     email: { required, email },
        //     password: { required, minLength: minLength(5) },
        //     confirmpassword: { required, sameAs: sameAs(state.password) },
        // };

        const v$ = useValidate(rules, state);
        const router = useRouter();
        const handleSubmit = async () => {
            v$.value.$validate();

            if (!v$.value.$error) {
                const responsive = await axios.post("register", state);
                await router.push("/login");
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
.signup {
    margin: 50px auto 0 auto;
    width: 40%;
    background-color: #fff;
    padding: 40px;
    box-shadow: 0 0 10px rgba(225, 223, 223, 0.1);
}

.signup__header {
    width: 100%;
    margin: 0 auto 2rem;
}
.signup__title {
    font-size: 32px;
    color: var(--black-color);
    font-weight: 600;
}
.signup__question {
    font-size: 14px;
    color: var(--text-color);
}

.signup__center {
    width: 100%;
}

.signup__center button {
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
</style>
