<script>
    import {MultipleChoiceQuestion} from "../../questionTypes/MultipleChoiceQuestion";
    import QuizNavigationBar from "../../components/editQuizComponents/QuizNavigationBar.svelte";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import {v4 as uuid} from "uuid";
    import {getQuiz, saveQuiz, workingQuiz} from "../../stores/quizStores";
    import MultipleChoiceQuizItem from "../../components/quiz/MultipleChoiceQuizItem.svelte";
    import {writable} from "svelte/store";
    import {quizSessions} from "../../stores/quizSessions";

    let editMode = true;
    let quiz = getQuiz($page.params.slug);
    let questionItems = writable([]);
    if($quizSessions.find(session => session.quizId == quiz.quizId) != undefined) {
        editMode = false;
    }
    else {
        workingQuiz.set(quiz);
    }
    questionItems.update(items => {
        for(let questionItem of quiz.questionItems) {
            if(questionItem.questionType == "multipleChoice") {
                items.push({
                    component: MultipleChoiceQuizItem,
                    questionItem: questionItem
                });
            }
        }
        return items;
    });

    function quizItemAdded(event) {
        if(event.detail == "multipleChoice") {
            let item = new MultipleChoiceQuestion(uuid(), "Question");
            quiz.questionItems.push(item);
            questionItems.update(items => {
                items.push({
                    component: MultipleChoiceQuizItem,
                    questionItem: item
                });
                return items;
            });
        }
    }
    function saveButtonClicked() {
        if(saveQuiz(quiz)) {
            alert("Quiz saved");
        }
    }
    function editQuizItemClicked(event) {
        goto("/editQuestion/" + event.detail.questionId);
    }
    function exitEditQuiz() {
        goto("/quizzes");
    }
</script>

<style>
    div {
        width: 100%;
        background-color: antiquewhite;
    }
</style>

<QuizNavigationBar {quiz} on:saveButtonClicked="{saveButtonClicked}" on:quizItemSelected="{quizItemAdded}" {editMode} on:exitQuizClicked={exitEditQuiz}></QuizNavigationBar>
{#if !editMode}
    <div>
        <p>A session is currently open for this quiz. Editing has been disabled</p>
    </div>
{/if}
{#each $questionItems as questionItem}
    <svelte:component
        this={questionItem.component}
        questionItem={questionItem.questionItem}
        on:editQuestionItemClicked={editQuizItemClicked}
        mode="{editMode ? "edit" : "readOnly"}"
    ></svelte:component>
{/each}