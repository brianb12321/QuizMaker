<script>
    import {page} from "$app/stores";
    import {quizSessions} from "../../stores/quizSessions";
    import {getQuiz} from "../../stores/quizStores";
    import QuizNavigationBar from "../../components/editQuizComponents/QuizNavigationBar.svelte";
    import Button from "../../components/Button.svelte";
    import MultipleChoiceQuizItem from "../../components/quiz/MultipleChoiceQuizItem.svelte";

    let quizSession = $quizSessions.find(session => session.sessionId == $page.params.slug);
    let quiz = getQuiz(quizSession.quizId);
    let questionItems = [];
    for(let questionItem of quiz.questionItems) {
        switch(questionItem.questionType) {
            case "multipleChoice":
                questionItems.push({
                    component: MultipleChoiceQuizItem,
                    questionItem: questionItem
                });
                break;
        }
    }

    function submitQuiz() {
        const gradeReport = quiz.grade();
        console.log(gradeReport);
        alert("Quiz Graded");
    }
</script>
<style>
    div {
        margin: auto;
        width: 50%;
    }
</style>

<QuizNavigationBar {quiz}></QuizNavigationBar>

{#each questionItems as questionItem}
    <svelte:component
        this={questionItem.component}
        questionItem={questionItem.questionItem}
        feedback={questionItem.feedback}
        mode="quiz"
    ></svelte:component>
{/each}

<div>
    <Button cssClass="green" on:click="{submitQuiz}">Submit Quiz</Button>
</div>