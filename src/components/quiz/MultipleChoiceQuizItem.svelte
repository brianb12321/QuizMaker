<script>
    import QuizFrame from "./QuizFrame.svelte";
    import {createEventDispatcher} from "svelte";
    export let questionItem;
    export let editMode;

    let editQuestionItemClicked = createEventDispatcher();
    function forwardEditQuestionItemClicked() {
        editQuestionItemClicked("editQuestionItemClicked", questionItem);
    }
</script>

<style>
    label {
        display: flex;
        flex-direction: row;
    }
    div {
        display: flex;
        flex-direction: column;
    }
</style>

<QuizFrame questionType="multipleChoice" questionTypeTitle="Multiple Choice" title="{questionItem.questionName}" editMode={editMode} on:editQuestionItemClicked="{forwardEditQuestionItemClicked}">
    {@html questionItem.bodyText}
    <div>
        {#each questionItem.questionOptions as option}
            <label for="{questionItem.questionId}-{questionItem.questionOptions.indexOf(option)}">
                {@html option.bodyText}
                <input id="{questionItem.questionId}-{questionItem.questionOptions.indexOf(option)}" type="radio" name="{questionItem.questionId}" value="{option.bodyText}">
            </label>
        {/each}
    </div>
</QuizFrame>