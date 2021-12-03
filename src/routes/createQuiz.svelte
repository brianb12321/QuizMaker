<script>
    import Button from "../components/Button.svelte";
    import { addQuiz } from "../stores/quizStores";
    import { Quiz } from "../Quiz";
    import {v4 as uuid} from "uuid";
    import {goto} from "$app/navigation";

    let quizName = "";
    let quizDescription = "";

    function createQuiz() {
        const newGuid = uuid();
        if(addQuiz(new Quiz(newGuid, quizName, quizDescription, []))) {
            alert("Quiz Added");
            goto("/editQuiz/" + newGuid);
        }
    }
</script>

<h1>Create Quiz</h1>

<form>
    <div class="formfield">
        <label for="quizName">Quiz Name</label>
        <div class="input-wrapper">
          <input id="quizName" class="table-form" bind:value="{quizName}"/>
        </div>
      </div>
      <div class="formfield">
        <label for="quizDescription">Description</label>
        <div class="input-wrapper">
          <textarea id="quizDescription" rows="3" class="table-form" bind:value="{quizDescription}"></textarea>
        </div>
      </div>
</form>
<Button cssClass="blue" on:click="{createQuiz}">Create Quiz</Button>