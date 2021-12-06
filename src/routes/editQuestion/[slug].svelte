<script>
    import {saveQuiz} from "../../stores/quizStores";
    import {goto} from "$app/navigation";
    import {workingQuiz} from "../../stores/quizStores";
    import {page} from "$app/stores";
    import MultipleChoiceEditQuestion from "../../components/editQuestionComponents/multipleChoice/MultipleChoiceEditQuestion.svelte";
    import TextEditQuestion from "../../components/editQuestionComponents/text/TextEditQuestion.svelte";

    let quiz = $workingQuiz;
    let questionItem = quiz.questionItems.find(item => item.questionId == $page.params.slug);
    let questionEditComponent;

    switch(questionItem.questionType) {
        case "multipleChoice":
            questionEditComponent = MultipleChoiceEditQuestion;
            break;
        case "text":
            questionEditComponent = TextEditQuestion;
            break;
    }

    function questionItemSaved() {
        if(saveQuiz(quiz)) {
            goto("/editQuiz/" + quiz.quizId);
        }
        else {
            alert("Failed to save the quiz item.");
        }
    }
    
</script>

<svelte:component this={questionEditComponent} {quiz} {questionItem} on:questionItemSaved={questionItemSaved}></svelte:component>