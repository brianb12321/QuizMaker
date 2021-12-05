export class QuizSession {
    sessionId;
    quizId;
    state;

    constructor(sessionId, quizId) {
        this.sessionId = sessionId;
        this.quizId = quizId;
    }
}