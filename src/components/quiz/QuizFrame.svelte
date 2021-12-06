<script>
    import Button from "../../components/Button.svelte";
    import {createEventDispatcher} from "svelte";

    export let questionType = "multipleChoice";
    export let questionTypeTitle = "";
    export let questionItem;
    export let mode;
    let dispatcher = createEventDispatcher();
    export let feedback;

    function forwardEditQuestionItemClicked() {
        dispatcher("editQuestionItemClicked", questionItem);
    }
    function forwardQuestionUpClicked() {
        dispatcher("questionUpClicked", questionItem);
    }
    function forwardQuestionDownClicked() {
        dispatcher("questionDownClicked", questionItem);
    }
    function forwardQuestionDeleteClicked() {
        dispatcher("questionDeleteClicked", questionItem);
    }
</script>

<style>
    header {
        display: flex;
        background-color: rgb(216, 207, 207);
        width: 100%;
        height: 40px;
        height: auto;
        overflow: auto;
    }
    .header-main {
        display: flex;
        width: 100%;    
    }
    .header-questionTypeTitle {
        margin-left: 10px;
        width: 75px;
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
        margin-top: 20px;
        margin-bottom: 20px;
        overflow-x: scroll;
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
        vertical-align: middle;
        line-height: 40px;
    }
    
    h2 {
        vertical-align: middle;
        line-height: 40px;
    }

    .legend-multipleChoice {
        background-color: orange;
    }
    .legend-text {
        background-color: blue;
    }

    .main {
        margin: 10px;
    }

    .feedback {
        margin: 10px;
        background-color: antiquewhite;
    }
    .question-controls {
        margin: 10px;
    }

    @media screen and (max-width: 692px) {
        header {
            flex-direction: column;  
        }
        .header-edit {
            width: 100%;
        }
    }
</style>

<div class="quiz-frame">
    <header>
        <div class="header-main">
            <div class="header-questionLegend legend-{questionType}"></div>
            <p class="header-questionTypeTitle">{questionTypeTitle}</p>
            <div class="header-title">
                <h2>{questionItem.questionName}</h2>
            </div>
            {#if questionItem.ungraded != true}
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
            {/if}
        </div>
        {#if mode === "edit"}
            <div class="header-edit">
                <Button cssClass="green height-100pct width-100pct" on:click="{forwardEditQuestionItemClicked}">Edit</Button>
            </div>
        {/if}
    </header>
    {#if mode == "edit"}
        <div class="question-controls">
            <Button cssClass="green" on:click={forwardQuestionUpClicked}>^</Button>
            <Button cssClass="green" on:click={forwardQuestionDownClicked}>v</Button>
            <Button cssClass="red" on:click={forwardQuestionDeleteClicked}>Delete</Button>
        </div>
    {/if}
    <div class="main">
        <slot />
    </div>
{#if mode === "review"}
    <div class="feedback">
        {@html feedback.feedbackBody}
    </div>
{/if}
</div>