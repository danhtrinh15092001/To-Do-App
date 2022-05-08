<template>
    <nav class="filter-nav d-flex flex-row">
        <button @click="updateFilter('all')" :class="{ active: current === 'all' }">View All</button>
        <button @click="updateFilter('current')" :class="{ active: current === 'current' }">Completed</button>
        <button @click="updateFilter('ongoing')" :class="{ active: current === 'ongoing' }">OnGoing</button>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    methods: {
        updateFilter(by: string) {
            this.$emit("filterChange", by);
        },
    },
    props: ["current"],
});
</script>

<style>
.filter-nav button {
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
.filter-nav button.active {
    color: #555;
}
</style>
