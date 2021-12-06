<script>
    import { quizEnumeration } from "../stores/quizStores";
    import Button from "../components/Button.svelte";
    import {goto} from "$app/navigation";
    
</script>

<style>
    p {
        margin-bottom: 5px;
    }
</style>

<main class="margin">
    <h1>Quizzes</h1>

    <p>View and take any public quizzes that have been created.</p>

    <Button cssClass="blue" link="/createQuiz">Create Quiz</Button>
    <table>
        <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        {#each $quizEnumeration as quiz}
            <tr>
                <td><a href="/quizSummary/{quiz.quizId}">{quiz.name}</a></td>
                <td><a href="/editQuiz/{quiz.quizId}">Edit</a></td>
                <td><a href="/deleteQuiz/{quiz.quizId}">Delete</a></td>
            </tr>
        {/each}
    </table>
</main>