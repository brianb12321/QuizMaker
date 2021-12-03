<script>
    import Editor from "@tinymce/tinymce-svelte";
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
</div>