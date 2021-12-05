<script>
    import {page} from "$app/stores";
    import {quizSessions} from "../../stores/quizSessions";
    import {getQuiz} from "../../stores/quizStores";
    import QuizNavigationBar from "../../components/editQuizComponents/QuizNavigationBar.svelte";
    import Button from "../../components/Button.svelte";
    import MultipleChoiceQuizItem from "../../components/quiz/MultipleChoiceQuizItem.svelte";
    import { onMount } from "svelte";
    import {goto} from "$app/navigation";

    let quizSession = $quizSessions.find(session => session.sessionId == $page.params.slug);
    let quiz = getQuiz(quizSession.quizId);
    let questionItems = [];
    let gradeReport;
    if(quizSession.state == undefined) {
        quizSession.state = {
            questionStates: [],
            gradeReport: undefined
        };
    }
    for(let questionItem of quiz.questionItems) {
        //Create session data and write to it.
        quizSession.state.questionStates.push({
            questionId: questionItem.questionId
        })
        switch(questionItem.questionType) {
            case "multipleChoice":
                questionItems.push({
                    component: MultipleChoiceQuizItem,
                    questionItem: questionItem
                });
                break;
        }
    }

    onMount(() => {
        for(let questionItem of quiz.questionItems) {
            questionItem.readSession(quizSession, quizSession.state.questionStates.find(state => state.questionId == questionItem.questionId));
        }
    });

    function submitQuiz() {
        gradeReport = quiz.grade();
        console.log(gradeReport);
        alert("Quiz Graded");
    }
    function exitQuiz() {
        if(confirm("Are you sure you want to exit the quiz?")) {
            goto("/quizSummary/" + quiz.quizId);
        }

        //Save session
        for(let questionItem of quiz.questionItems) {
            if(gradeReport != undefined) {
                quizSession.state.gradeReport = gradeReport;
            }

            questionItem.writeToSession(quizSession.state.questionStates.find(state => state.questionId == questionItem.questionId));
            quizSessions.update(sessions => {
                let sessionIndex = sessions.findIndex(session => session.quizId == quiz.quizId);
                sessions[sessionIndex] = quizSession;
                return sessions;
            });
        }
    }
</script>
<style>
    div {
        margin: auto;
        width: 50%;
    }
</style>

<QuizNavigationBar {quiz} on:exitQuizClicked={exitQuiz}></QuizNavigationBar>

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