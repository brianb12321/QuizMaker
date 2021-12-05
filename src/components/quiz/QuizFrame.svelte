<script>
    import Button from "../../components/Button.svelte";
    import {createEventDispatcher} from "svelte";

    export let questionType = "multipleChoice";
    export let questionTypeTitle = "";
    export let questionItem;
    export let mode;
    export let editQuestionItemClicked = createEventDispatcher();
    export let feedback;

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
        width: 70px;
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
        width: 100%;
    }
    .header-grade {
        width: 60px;
    }
    .header-grade p {
        height: 100%;
        vertical-align:middle;
        line-height: 40px;
    }
    
    h2 {
        vertical-align:middle;
        line-height: 40px;
    }

    .legend-multipleChoice {
        background-color: orange;
    }

    .main {
        margin: 10px;
    }

    .feedback {
        margin: 10px;
        background-color: antiquewhite;
    }
</style>

<div class="quiz-frame">
    <header>
        <div class="header-questionLegend legend-{questionType}"></div>
        <p class="header-questionTypeTitle">{questionTypeTitle}</p>
        <div class="header-title">
            <h2>{questionItem.questionName}</h2>
        </div>
        <div class="header-grade">
            <p>
                {#if mode === "review"}
                {feedback.earnedMarks}
                {:else}
                __
                {/if}
                 / {questionItem.totalPoints}
            </p>
        </div>
        {#if mode === "edit"}
            <div class="header-edit">
                <Button cssClass="green height-100pct" on:click="{forwardEditQuestionItemClicked}">Edit</Button>
            </div>
        {/if}
    </header>
    <div class="main">
        <slot />
    </div>
{#if mode === "review"}
    <div class="feedback">
        {@html feedback.feedbackBody}
    </div>
{/if}
</div>