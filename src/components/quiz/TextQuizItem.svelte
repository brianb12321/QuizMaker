<script>
    import QuizFrame from "./QuizFrame.svelte";
    import {QuestionFeedback} from "../../QuestionFeedback";
    import {createEventDispatcher} from "svelte";
    export let questionItem;
    export let mode = "quiz";
    export let gradeFeedback;

    let dispatcher = createEventDispatcher();

    function forwardQuestionUpClicked(event) {
        dispatcher("questionUpClicked", event.detail);
    }
    function forwardQuestionDownClicked(event) {
        dispatcher("questionDownClicked", event.detail);
    }
    function forwardQuestionDeleteClicked(event) {
        dispatcher("questionDeleteClicked", event.detail);
    }

    if(mode != "edit" || mode != "readOnly") {
        questionItem.readSession = (session, state) => {
            
        };
        questionItem.writeToSession = (state) => {
    
        };
        questionItem.grade = () => {
            return undefined;
        };
    }
    function forwardEditQuestionItemClicked() {
        dispatcher("editQuestionItemClicked", questionItem);
    }
</script>

<QuizFrame
    questionType="text"
    questionTypeTitle="Text"
    {questionItem} bind:mode="{mode}"
    bind:feedback={gradeFeedback}
    on:editQuestionItemClicked="{forwardEditQuestionItemClicked}"
    on:questionUpClicked={forwardQuestionUpClicked}
    on:questionDownClicked={forwardQuestionDownClicked}
    on:questionDeleteClicked={forwardQuestionDeleteClicked}
    >
    {@html questionItem.bodyText}
</QuizFrame>