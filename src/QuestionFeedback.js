export class QuestionFeedback {
    earnedMarks;
    totalMarks;
    feedbackBody;
    constructor(earnedMarks, totalMarks) {
        this.earnedMarks = earnedMarks;
        this.totalMarks = totalMarks;
        this.feedbackBody = "";
    }
}