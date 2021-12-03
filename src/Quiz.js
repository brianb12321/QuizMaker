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
}