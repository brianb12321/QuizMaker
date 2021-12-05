<script>
    import Button from "../Button.svelte";
    import {goto} from "$app/navigation";
    import { createEventDispatcher } from "svelte";

    export const quizItemSelected = createEventDispatcher();
    export const saveButtonClicked = createEventDispatcher();
    let currentQuizItemSelection;
    export let quiz;
    export let editMode;

    function quizItemSelectedHandler() {
        quizItemSelected("quizItemSelected", currentQuizItemSelection);
    }
    function saveButtonClickedHandler() {
        saveButtonClicked("saveButtonClicked");
    }
    function exitQuiz() {
        if(confirm("Are you sure you want to exit the quiz?")) {
            goto("/quizSummary/" + quiz.quizId);
        }
    }
</script>

<style>
    nav {
        width: 100%;
        border: 1px solid black;
        display: flex;
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
        <p>{quiz.name}</p>
        <Button cssClass="red" on:click="{exitQuiz}">Exit Quiz</Button>
    {/if}
</nav>