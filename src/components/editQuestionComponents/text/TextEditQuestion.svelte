<script>
    import Editor from "@tinymce/tinymce-svelte";
    import {getTinyMCEKey} from "../../../stores/secrets";
    import {createEventDispatcher} from "svelte";
    import Button from "../../Button.svelte";

    export let questionItem;
    export let quiz;
    let questionItemSaved = createEventDispatcher();

    let editorConf = {
        height: 600,
        plugins: "paste image",
        paste_data_images: true
    };

    function forwardQuestionItemSaved() {
        questionItemSaved("questionItemSaved");
    }
</script>

<form>
    <h1>Editing question type {questionItem.questionType}</h1>
    <div class="formfield">
        <label for="questionName">Name</label>
        <div class="input-wrapper">
          <input id="questionName" type="text" bind:value="{questionItem.questionName}"/>
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
    <div class="form-buttons">
        <Button cssClass="green" on:click="{forwardQuestionItemSaved}">Save and Return</Button>
    </div>
</form>