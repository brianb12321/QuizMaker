<script>
    import Button from "../components/Button.svelte";
    import { addQuiz } from "../stores/quizStores";
    import { Quiz } from "../Quiz";
    import {v4 as uuid} from "uuid";
    import {goto} from "$app/navigation";
    import Editor from "@tinymce/tinymce-svelte";
    import {getTinyMCEKey} from "../stores/secrets";
    let quizName = "";
    let quizDescription = "";

    let conf = {
      height: "300"
    };
    function createQuiz() {
        const newGuid = uuid();
        if(addQuiz(new Quiz(newGuid, quizName, quizDescription, []))) {
            alert("Quiz Added");
            goto("/editQuiz/" + newGuid);
        }
    }
</script>

<form>
    <h1>Create Quiz</h1>
    <div class="formfield">
        <label for="quizName">Quiz Name</label>
        <div class="input-wrapper">
          <input type="text" id="quizName" bind:value="{quizName}" required/>
        </div>
      </div>
      <div class="formfield">
        <label for="quizDescription">Description</label>
        <div class="input-wrapper">
          <Editor id="quizDescription" {conf} apiKey="{getTinyMCEKey()}" rows="3" bind:value="{quizDescription}"></Editor>
        </div>
      </div>
      <Button cssClass="blue" on:click="{createQuiz}">Create Quiz</Button>
</form>