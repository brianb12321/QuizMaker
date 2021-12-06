<script>
    import QuizFrame from "./QuizFrame.svelte";
    import {QuestionFeedback} from "../../QuestionFeedback";
    import {createEventDispatcher} from "svelte";
    export let questionItem;
    export let mode = "quiz";
    export let gradeFeedback;
    let disabled;
    let selectedOption;

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
            if(state != undefined) {
                selectedOption = questionItem.questionOptions.find(option => option.optionId == state.selectedOptionId);   
                if(state.gradeFeedback != undefined) {
                    gradeFeedback = state.gradeFeedback;
                    mode = "review";
                    disabled = true;
                }
            }
        };
        questionItem.writeToSession = (state) => {
            if(selectedOption != undefined) {
                state.selectedOptionId = selectedOption.optionId;
            }
            if(gradeFeedback != undefined) {
                state.gradeFeedback = gradeFeedback;
            }
        };
        questionItem.grade = () => {
            let totalPercentage = 0;
            if(selectedOption == undefined) {
                totalPercentage = 0;
            }
            else {
                totalPercentage += selectedOption.percentageValue;
            }
            let pointsEarned = totalPercentage * questionItem.totalPoints;
            const feedback = new QuestionFeedback(pointsEarned, questionItem.totalPoints);
            if(pointsEarned == questionItem.totalPoints) {
                feedback.feedbackBody = "<p>Question correct!</p>";
            }
            else {
                feedback.feedbackBody = "<p>Question incorrect!</p>";
            }
            gradeFeedback = feedback;
            mode = "review";
            return feedback;
        };
    }
    function forwardEditQuestionItemClicked() {
        dispatcher("editQuestionItemClicked", questionItem);
    }
</script>

<style>
    label {
        display: flex;
        flex-direction: row;
        margin-top: 5px;
    }
    div {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
    }
    input[type="radio"] {
        margin-right: 10px;
    }
</style>

<QuizFrame
    questionType="multipleChoice"
    questionTypeTitle="Multiple Choice"
    {questionItem} bind:mode="{mode}"
    bind:feedback={gradeFeedback}
    on:editQuestionItemClicked="{forwardEditQuestionItemClicked}"
    on:questionUpClicked={forwardQuestionUpClicked}
    on:questionDownClicked={forwardQuestionDownClicked}
    on:questionDeleteClicked={forwardQuestionDeleteClicked}
    >
    {@html questionItem.bodyText}
    <div>
        {#each questionItem.questionOptions as option}
            <label for="{option.optionId}">
                <input id="{option.optionId}" type="radio" name="{questionItem.questionId}" value="{option}" bind:group="{selectedOption}" {disabled}>
                {@html option.bodyText}
            </label>
        {/each}
    </div>
</QuizFrame>