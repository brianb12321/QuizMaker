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

<QuizFrame questionType="multipleChoice" questionTypeTitle="Multiple Choice" title="{questionItem.questionName}" editMode={editMode} on:editQuestionItemClicked="{forwardEditQuestionItemClicked}">
    {@html questionItem.bodyText}
</QuizFrame>