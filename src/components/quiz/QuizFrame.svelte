<script>
    import Button from "../../components/Button.svelte";
    import {createEventDispatcher} from "svelte";

    export let questionType = "multipleChoice";
    export let questionTypeTitle = "";
    export let title = "";
    export let editMode = false;
    export let editQuestionItemClicked = createEventDispatcher();

    function forwardEditQuestionItemClicked() {
        editQuestionItemClicked("editQuestionItemClicked");
    }
</script>

<style>
    header {
        display: flex;
        background-color: rgb(216, 207, 207);
        widows: 100%;
        height: 40px;
    }
    .header-questionTypeTitle {
        margin-left: 10px;
    }
    
    .header-questionLegend {
        height: 100%;
        width: 10px;
        margin: 0;
    }
    .quiz-frame {
        border: 1px black solid;
        box-shadow: 2px 2px 2px;
        margin: auto;
        width: 50%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .header-title {
        height: 100%;
        width: 90%;
    }
    
    h2 {
        vertical-align:middle;
        line-height: 40px;
    }

    .legend-multipleChoice {
        background-color: orange;
    }
</style>

<div class="quiz-frame">
    <header>
        <div class="header-questionLegend legend-{questionType}"></div>
        <p class="header-questionTypeTitle">{questionTypeTitle}</p>
        <div class="header-title">
            <h2>{title}</h2>
        </div>
        <div class="header-grade">
            {#if editMode}
            <label>
                Possible Points
                <input class="input-pointsPossible" type="number">
            </label>
            {/if}
        </div>
        {#if editMode}
        <div class="header-edit">
            <Button cssClass="green height-100pct" on:click="{forwardEditQuestionItemClicked}">Edit</Button>
        </div>
        {/if}
    </header>
    <div class="main">
        <slot />
    </div>
</div>