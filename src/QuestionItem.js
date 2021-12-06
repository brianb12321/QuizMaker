export class QuestionItem {
    questionId;
    questionType;
    questionName;
    totalPoints;
    bodyText;
    ungraded;
    readSession;
    writeToSession;
    grade;

    constructor(questionId, questionType, questionName) {
        this.questionId = questionId;
        this.questionType = questionType;
        this.questionName = questionName;
        this.totalPoints = 0;
        this.bodyText = "";
        this.ungraded = false;
        this.grade = () => {return undefined};
        this.readSession = (session, state) => {};
        this.writeToSession = (state) => {};
    }
}