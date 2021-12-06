import { GradeReport } from "./GradeReport";

export class Quiz {
    quizId
    name;
    description;
    questionItems;

    constructor(quizId, name, description, questionItems) {
        this.quizId = quizId;
        this.name = name;
        this.description = description;
        this.questionItems = questionItems;
    }
    grade() {
        const gradeReport = new GradeReport();
        for(let item of this.questionItems.filter(item => item.ungraded != true)) {
            const feedback = item.grade();
            if(feedback != undefined) {
                gradeReport.questionFeedback.push(feedback);
            }
        }
        return gradeReport;
    }
}