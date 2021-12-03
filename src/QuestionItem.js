export class QuestionItem {
    questionId;
    questionType;
    questionName;
    bodyText;

    constructor(questionId, questionType, questionName) {
        this.questionId = questionId;
        this.questionType = questionType;
        this.questionName = questionName;
        this.bodyText = "";
    }
}