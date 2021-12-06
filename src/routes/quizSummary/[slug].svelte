<script>
    import {page} from "$app/stores";
    import {getQuiz} from "../../stores/quizStores";
    import {quizSessions} from "../../stores/quizSessions";
    import {QuizSession} from "../../QuizSession";
    import {v4 as uuid} from "uuid";
    import {goto} from "$app/navigation";
    import Button from "../../components/Button.svelte";

    let quizId = $page.params.slug;
    let quizSession = $quizSessions.find(session => session.quizId == quizId);
    let quiz = getQuiz(quizId);

    function takeQuiz() {
        if(quizSession == undefined) {
            const sessionId = uuid();
            quizSessions.update(sessions => {
                sessions.push(new QuizSession(sessionId, quizId));
                return sessions;
            });
            goto("/takeQuiz/" + sessionId);
        }
        else {
            goto("/takeQuiz/" + quizSession.sessionId);
        }
    }
</script>

<main class="margin">
    <h1>Quiz - {quiz.name}</h1>

    <h2>Instructions</h2>
    <p>When ready, click the take quiz button. A quiz session will be generated for you.</p>
    <Button on:click="{takeQuiz}" cssClass="blue">{quizSession == undefined ? "Take Quiz" : "Resume Quiz"}</Button>
</main>