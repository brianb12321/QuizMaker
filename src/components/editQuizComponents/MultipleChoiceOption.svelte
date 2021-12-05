<script>
    import Editor from "@tinymce/tinymce-svelte";
import { select_multiple_value } from "svelte/internal";
    export let option;
    let editorConf = {

    }
</script>
<style>
    div {
        background-color: darkgrey;
    }
</style>

<div>
    <div class="formfield">
        <label for="questionBody">Body</label>
        <div class="input-wrapper">
            <Editor
                apiKey="tim2ezjg2v3l7v99lar4byxxp4hcenddb25csn1cpc5o45sz"
                conf="{editorConf}"
                bind:value="{option.bodyText}"
            >
            </Editor>
        </div>
    </div>
    <div class="formfield">
        <label for="perecentageValue">Percentage</label>
        <div class="input-wrapper">
            <select id="percentageValue" bind:value="{option.percentageValue}">
                <option name="100" value="1">100%</option>
                <option name="0" value="0">0%</option>
            </select>
        </div>
    </div>
</div>