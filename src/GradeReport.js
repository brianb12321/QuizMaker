export class GradeReport {
    questionFeedback;

    constructor() {
        this.questionFeedback = [];
    }
}

export function getEarnedMarks(gradeReport) {
    let total = 0;

    for(let feedback of gradeReport.questionFeedback) { 
        total += Number(feedback.earnedMarks);
    }
    return total;
}
export function getTotalMarks(gradeReport) {
    let total = 0;

    for(let feedback of gradeReport.questionFeedback) {
        total += Number(feedback.totalMarks);
    }
    return total;
}