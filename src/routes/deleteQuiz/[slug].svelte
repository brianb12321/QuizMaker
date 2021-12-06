<script>
    import Button from "../../components/Button.svelte";
    import {page} from "$app/stores";
    import {deleteQuiz} from "../../stores/quizStores";
    import {goto} from "$app/navigation";
    import {quizSessions} from "../../stores/quizSessions";
    let quizId = $page.params.slug;

    function deleteQuizClicked() {
        if(deleteQuiz(quizId)) {
            if($quizSessions.find(session => session.quizId == quizId)) {
                quizSessions.update(sessions => {
                    sessions.splice(sessions.findIndex(session => session.quizId == quizId), 1);
                    sessionStorage.setItem("quizSessions", JSON.stringify(sessions));
                    return sessions;
                });
            }
            alert("Quiz deleted");
            goto("/quizzes");
        }
    }
</script>

<main class="margin">
    <h1>Confirmation</h1>
    <p>Are you sure you want to delete this quiz?</p>
    <Button cssClass="green" link="/quizzes">No</Button>
    <Button cssClass="red" on:click={deleteQuizClicked}>Do It!</Button>
</main>