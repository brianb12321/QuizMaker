<script>
    import Button from "../Button.svelte";
    import Select from "svelte-select";
    import { createEventDispatcher } from "svelte";

    export const quizItemSelected = createEventDispatcher();
    export const saveButtonClicked = createEventDispatcher();
    let currentQuizItemSelection;
    export let quiz;

    function quizItemSelectedHandler() {
        quizItemSelected("quizItemSelected", currentQuizItemSelection);
    }
    function saveButtonClickedHandler() {
        saveButtonClicked("saveButtonClicked");
    }
</script>

<style>
    nav {
        width: 100%;
        border: 1px solid black;
    }
</style>

<nav>
    <input value="{quiz.name}">
    <Button cssClass="green" on:click="{saveButtonClickedHandler}">Save</Button>
    <select bind:value="{currentQuizItemSelection}">
        <option value="multipleChoice">Multiple Choice</option>
    </select>
    <Button cssClass="green" on:click="{quizItemSelectedHandler}">Add Question</Button>
</nav>