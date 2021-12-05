<script>
    import QuizFrame from "./QuizFrame.svelte";
    import {QuestionFeedback} from "../../QuestionFeedback";
    import {createEventDispatcher} from "svelte";
    export let questionItem;
    export let mode = "quiz";
    export let gradeFeedback;
    let selectedOption;

    let editQuestionItemClicked = createEventDispatcher();

    questionItem.readSession = (session, state) => {
        if(state != undefined) {
            selectedOption = questionItem.questionOptions.find(option => option.optionId == state.selectedOptionId);   
        }
        if(state.gradeFeedback != undefined) {
            gradeFeedback = state.gradeFeedback;
            mode = "review";
        }
    };
    questionItem.writeToSession = (state) => {
        state.selectedOptionId = selectedOption.optionId;
        if(gradeFeedback != undefined) {
            state.gradeFeedback = gradeFeedback;
        }
    };
    questionItem.grade = () => {
        console.log(selectedOption);
        let totalPercentage = 0;
        totalPercentage += selectedOption.percentageValue;
        let pointsEarned = totalPercentage * questionItem.totalPoints;
        const feedback = new QuestionFeedback(pointsEarned);
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
    function forwardEditQuestionItemClicked() {
        editQuestionItemClicked("editQuestionItemClicked", questionItem);
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
    }
</style>

<QuizFrame questionType="multipleChoice" questionTypeTitle="Multiple Choice" {questionItem} bind:mode="{mode}" bind:feedback={gradeFeedback} on:editQuestionItemClicked="{forwardEditQuestionItemClicked}">
    {@html questionItem.bodyText}
    <div>
        {#each questionItem.questionOptions as option}
            <label for="{option.optionId}">
                <input id="{option.optionId}" type="radio" name="{questionItem.questionId}" value="{option}" bind:group="{selectedOption}">
                {@html option.bodyText}
            </label>
        {/each}
    </div>
</QuizFrame>