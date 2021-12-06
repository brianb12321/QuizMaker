<script>
    import Button from "../Button.svelte";
    import { createEventDispatcher } from "svelte";

    export const dispatcher = createEventDispatcher();

    let currentQuizItemSelection;
    export let quiz;
    export let editMode;

    function quizItemSelectedHandler() {
        dispatcher("quizItemSelected", currentQuizItemSelection);
    }
    function saveButtonClickedHandler() {
        dispatcher("saveButtonClicked");
    }
    function exitQuizClickedHandler() {
        dispatcher("exitQuizClicked");
    }
</script>

<style>
    nav {
        width: 100%;
        border: 1px solid black;
        display: flex;
        margin-bottom: 10px;
    }
    h1 {
        height: 100%;
        margin-right: 10px;
        margin-left: 10px;
        line-height: 40px;
    }
</style>

<nav>
    {#if editMode}
        <input value="{quiz.name}">
        <Button cssClass="green" on:click="{saveButtonClickedHandler}">Save</Button>
        <select bind:value="{currentQuizItemSelection}">
            <option value="multipleChoice">Multiple Choice</option>
            <option value="text">Text</option>
        </select>
        <Button cssClass="green" on:click="{quizItemSelectedHandler}">Add Question</Button>
    {:else}
        <h1>{quiz.name}</h1>
        <Button cssClass="red" on:click="{exitQuizClickedHandler}">Exit Quiz</Button>
    {/if}
</nav>