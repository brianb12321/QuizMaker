export class MultipleChoiceQuestionOption {
    optionId;
    bodyText;
    percentageValue;
    constructor(optionId) {
        this.optionId = optionId;
        this.bodyText = "";
        this.percentageValue = 0.00;
    }
}