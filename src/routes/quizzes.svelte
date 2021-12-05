<script>
    import { quizEnumeration } from "../stores/quizStores";
    import Button from "../components/Button.svelte";

    let quizzesToDisplay = [];
    quizEnumeration.subscribe(quizzes => {
        quizzesToDisplay = quizzes;
    });
    
</script>

<h1>Quizzes</h1>

<p>View and take any public quizzes that have been created.</p>

<Button cssClass="blue" link="/createQuiz">Create Quiz</Button>
<table>
    <tr>
        <th>Name</th>
        <th>Edit</th>
    </tr>
    {#each quizzesToDisplay as quiz}
        <tr>
            <td><a href="/quizSummary/{quiz.quizId}">{quiz.name}</a></td>
            <td><a href="/editQuiz/{quiz.quizId}">Edit</a></td>
        </tr>
    {/each}
</table>