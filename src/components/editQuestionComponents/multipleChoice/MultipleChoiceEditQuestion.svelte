<script>
    import Editor from "@tinymce/tinymce-svelte";
    import {getTinyMCEKey} from "../../../stores/secrets";
    import {writable} from "svelte/store";
    import {createEventDispatcher} from "svelte";
    import Button from "../../Button.svelte";
    import MultipleChoiceOption from "./MultipleChoiceOption.svelte";
    import {MultipleChoiceQuestionOption} from "../../../questionTypes/MutlipleChoiceQuestionOption";
    import {v4 as uuid} from "uuid";

    export let questionItem;
    export let quiz;
    let choices = writable(questionItem.questionOptions);
    let questionItemSaved = createEventDispatcher();

    let editorConf = {
        height: 600,
        plugins: "paste image",
        paste_data_images: true
    };

    function forwardQuestionItemSaved() {
        questionItemSaved("questionItemSaved");
    }

    function addOptionClicked() {
        const option = new MultipleChoiceQuestionOption(uuid());
        choices.update(array => {
            array.push(option);
            return array;
        });
    }
    function deleteButtonClicked(event) {
        choices.update(array => {
            const index = array.indexOf(event.detail);
            array.splice(index, 1);
            return array;
        })
    }
</script>

<form>
    <h1>Editing question type {questionItem.questionType}</h1>
    <div class="formfield">
        <label for="questionName">Question Name</label>
        <div class="input-wrapper">
          <input id="questionName" type="text" bind:value="{questionItem.questionName}" required/>
        </div>
    </div>
    <div class="formfield">
        <label for="totalPoints">Total Points</label>
        <div class="input-wrapper">
          <input type="number" id="totalPoints" bind:value="{questionItem.totalPoints}" required/>
        </div>
    </div>
    <div class="formfield">
        <label for="questionBody">Body</label>
        <div class="input-wrapper">
            <Editor
                apiKey="{getTinyMCEKey()}"
                conf="{editorConf}"
                bind:value="{questionItem.bodyText}"
            >
            </Editor>
        </div>
    </div>
    {#each $choices as choice}
        <MultipleChoiceOption option="{choice}" on:deleteButtonClicked={deleteButtonClicked}></MultipleChoiceOption>
    {/each}
    <div class="form-buttons">
        <Button cssClass="green" on:click={addOptionClicked}>Add Option</Button>
        <Button cssClass="green" on:click="{forwardQuestionItemSaved}">Save and Return</Button>
    </div>
</form>