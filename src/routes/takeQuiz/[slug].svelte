<script>
    import {page} from "$app/stores";
    import {quizSessions} from "../../stores/quizSessions";
    import {getQuiz} from "../../stores/quizStores";
    import QuizNavigationBar from "../../components/editQuizComponents/QuizNavigationBar.svelte";
    import Button from "../../components/Button.svelte";
    import MultipleChoiceQuizItem from "../../components/quiz/MultipleChoiceQuizItem.svelte";
    import TextQuizItem from "../../components/quiz/TextQuizItem.svelte";
    import { onMount } from "svelte";
    import {goto} from "$app/navigation";
    import {getEarnedMarks, getTotalMarks} from "../../GradeReport";

    let quizSession = $quizSessions.find(session => session.sessionId == $page.params.slug);

    quizSessions.subscribe(sessions => {
        sessionStorage.setItem("quizSessions", JSON.stringify(sessions));
    });
    let quiz = getQuiz(quizSession.quizId);
    let questionItems = [];
    let gradeReport;
    if(quizSession.state == undefined) {
        quizSession.state = {
            questionStates: [],
            gradeReport: undefined
        };
        for(let questionItem of quiz.questionItems) {
            //Create session data and write to it.
            quizSession.state.questionStates.push({
                questionId: questionItem.questionId
            })
        }
    }
    if(quizSession.state.gradeReport != undefined) {
        gradeReport = quizSession.state.gradeReport;
    }
    for(let questionItem of quiz.questionItems) {
        switch(questionItem.questionType) {
            case "multipleChoice":
                questionItems.push({
                    component: MultipleChoiceQuizItem,
                    questionItem: questionItem
                });
                break;
            case "text":
                questionItems.push({
                    component: TextQuizItem,
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
    function exitAndDestroySession() {
        if(confirm("Are you sure you want to exit the quiz? Your session will finished.")) {
            quizSessions.update(sessions => {
                const index = sessions.findIndex(session => session.sessionId == quizSession.sessionId);
                sessions.splice(index, 1);
                return sessions;
            })
            goto("/quizSummary/" + quiz.quizId);
        }
    }
    function exitQuiz() {
        if(confirm("Are you sure you want to exit the quiz?")) {
            // //Save session
            if(gradeReport != undefined) {
                    quizSession.state.gradeReport = gradeReport;
            }
            for(let questionItem of quiz.questionItems) {
                questionItem.writeToSession(quizSession.state.questionStates.find(state => state.questionId == questionItem.questionId));
            }
            quizSessions.update(sessions => {
                    let sessionIndex = sessions.findIndex(session => session.quizId == quiz.quizId);
                    sessions[sessionIndex] = quizSession;
                    return sessions;
            });
            goto("/quizSummary/" + quiz.quizId);
        }
    }
</script>
<style>
    div {
        margin: auto;
        width: 50%;
    }
    .grade-report {
        width: 50%;
        margin: auto;
        text-align: right;
        padding-bottom: 5px;
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

{#if gradeReport != undefined}
<div class="grade-report">
    <p>Total score: {getEarnedMarks(gradeReport)} / {getTotalMarks(gradeReport)}</p>
</div>
{/if}

<div>
    {#if gradeReport == undefined}
        <Button cssClass="green" on:click="{submitQuiz}">Submit Quiz</Button>
    {:else}
        <Button cssClass="green" on:click="{exitAndDestroySession}">Exit and Finish</Button>
    {/if}
</div>