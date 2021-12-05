export class QuizSession {
    sessionId;
    quizId;

    constructor(sessionId, quizId) {
        this.sessionId = sessionId;
        this.quizId = quizId;
    }
}