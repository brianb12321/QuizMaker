<script>
    import {workingQuiz} from "../../stores/quizStores";
    import {page} from "$app/stores";

    let quiz = $workingQuiz;
    let questionItem = quiz.questionItems.find(item => item.questionId == $page.params.slug);
</script>

<h1>Editing question type {questionItem.questionType}</h1>