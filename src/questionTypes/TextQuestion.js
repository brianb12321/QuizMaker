import { QuestionItem } from "../QuestionItem";

export class TextQuestion extends QuestionItem {
    constructor(questionId, questionName) {
        super(questionId, "text", questionName);
        this.ungraded = true;
    }
}