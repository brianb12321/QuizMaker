export class QuestionItem {
    questionId;
    questionType;
    questionName;
    totalPoints;
    bodyText;
    grade;

    constructor(questionId, questionType, questionName) {
        this.questionId = questionId;
        this.questionType = questionType;
        this.questionName = questionName;
        this.totalPoints = 0;
        this.bodyText = "";
        this.grade = () => {return undefined};
    }
}