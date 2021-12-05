<script>
    import {saveQuiz} from "../../stores/quizStores";
    import {goto} from "$app/navigation";
    import {workingQuiz} from "../../stores/quizStores";
    import {page} from "$app/stores";
    import Button from "../../components/Button.svelte";
    import {v4 as uuid} from "uuid";
    import Editor from "@tinymce/tinymce-svelte";
    import MultipleChoiceOption from "../../components/editQuizComponents/MultipleChoiceOption.svelte";
    import {MultipleChoiceQuestionOption} from "../../questionTypes/MutlipleChoiceQuestionOption";
    import {writable} from "svelte/store";

    let quiz = $workingQuiz;
    let questionItem = quiz.questionItems.find(item => item.questionId == $page.params.slug);
    let choices = writable(questionItem.questionOptions);

    let editorConf = {
        height: 400,
        plugins: "paste image",
        paste_data_images: true
    };

    function questionItemSaved() {
        if(saveQuiz(quiz)) {
            goto("/editQuiz/" + quiz.quizId);
        }
        else {
            alert("Failed to save the quiz item.");
        }
    }
    function addOptionClicked() {
        const option = new MultipleChoiceQuestionOption(uuid());
        choices.update(array => {
            array.push(option);
            return array;
        });
    }
</script>

<h1>Editing question type {questionItem.questionType}</h1>

<form>
    <div class="formfield">
        <label for="questionName">Question Name</label>
        <div class="input-wrapper">
          <input id="questionName" class="table-form" bind:value="{questionItem.questionName}"/>
        </div>
    </div>
    <div class="formfield">
        <label for="totalPoints">Total points</label>
        <div class="input-wrapper">
          <input type="number" id="totalPoints" class="table-form" bind:value="{questionItem.totalPoints}"/>
        </div>
    </div>
    <div class="formfield">
        <label for="questionBody">Body</label>
        <div class="input-wrapper">
            <Editor
                apiKey="tim2ezjg2v3l7v99lar4byxxp4hcenddb25csn1cpc5o45sz"
                conf="{editorConf}"
                bind:value="{questionItem.bodyText}"
            >
            </Editor>
        </div>
    </div>
    {#each $choices as choice}
        <MultipleChoiceOption option="{choice}"></MultipleChoiceOption>
    {/each}
</form>

<Button cssClass="green" on:click={addOptionClicked}>Add Option</Button>
<Button cssClass="green" on:click="{questionItemSaved}">Save and Return</Button>