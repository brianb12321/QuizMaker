<script>
    import Editor from "@tinymce/tinymce-svelte";
    import {getTinyMCEKey} from "../../../stores/secrets";
    import Button from "../../Button.svelte";
    import {createEventDispatcher} from "svelte";

    export let option;
    let deleteBUttonClicked = createEventDispatcher();

    let editorConf = {
        width: "95%"
    }

    function forwardDeleteButtonClicked() {
        deleteBUttonClicked("deleteButtonClicked", option);
    }
</script>
<style>
    .option {
        background-color: darkgrey;
        margin-bottom: 20px;
        padding-top: 20px;
    }
    .formfield {
        margin-left: 10px;
    }
</style>

<div class="option">
    <div class="formfield">
        <label for="questionBody">Body</label>
        <div class="input-wrapper">
            <Editor
                apiKey="{getTinyMCEKey()}"
                conf="{editorConf}"
                bind:value="{option.bodyText}"
            >
            </Editor>
        </div>
    </div>
    <div class="formfield">
        <label for="perecentageValue">Percentage</label>
        <div class="input-wrapper">
            <select id="percentageValue" bind:value="{option.percentageValue}" required>
                <option name="100" value="1">100%</option>
                <option name="0" value="0">0%</option>
            </select>
        </div>
    </div>
    <div class="formfield">
        <label for="deleteButton">Delete</label>
        <div class="input-wrapper">
            <Button id="deleteButton" cssClass="red" on:click={forwardDeleteButtonClicked}>Delete</Button>
        </div>
    </div>
</div>