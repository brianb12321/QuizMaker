<script>
    import Button from "../Button.svelte";
    import {goto} from "$app/navigation";
    import { createEventDispatcher } from "svelte";

    export const quizItemSelected = createEventDispatcher();
    export const saveButtonClicked = createEventDispatcher();
    export const exitQuizClicked = createEventDispatcher();
    let currentQuizItemSelection;
    export let quiz;
    export let editMode;

    function quizItemSelectedHandler() {
        quizItemSelected("quizItemSelected", currentQuizItemSelection);
    }
    function saveButtonClickedHandler() {
        saveButtonClicked("saveButtonClicked");
    }
    function exitQuizClickedHandler() {
        exitQuizClicked("exitQuizClicked");
    }
</script>

<style>
    nav {
        width: 100%;
        border: 1px solid black;
        display: flex;
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
        </select>
        <Button cssClass="green" on:click="{quizItemSelectedHandler}">Add Question</Button>
    {:else}
        <h1>{quiz.name}</h1>
        <Button cssClass="red" on:click="{exitQuizClickedHandler}">Exit Quiz</Button>
    {/if}
</nav>