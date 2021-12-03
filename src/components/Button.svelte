<script>
    import { createEventDispatcher } from "svelte";
    export let link = "";
    export let cssClass = "red";
    export let click = createEventDispatcher();
    function buttonedClicked() {
        click("click");
    }
</script>
<style>
    button {
        padding: 5px;
    }
    .red {
        background-color: red;
    }
    .green {
        background-color: green;
    }
    .blue {
        background-color: rgb(43, 129, 241);
        color: white;
    }
    .height-100pct {
        height: 100%;
    }
</style>
{#if link != ""}
<a href={link}>
    <button class="{cssClass}" on:click="{buttonedClicked}">
        <slot />
    </button>
</a>
{:else}
<button class="{cssClass}" on:click="{buttonedClicked}">
    <slot />
</button>
{/if}