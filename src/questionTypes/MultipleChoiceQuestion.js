import {QuestionItem} from "../QuestionItem";
import { QuestionFeedback } from "../QuestionFeedback";

export class MultipleChoiceQuestion extends QuestionItem {
    questionOptions;

    constructor(questionId, questionName) {
        super(questionId, "multipleChoice", questionName);
        this.questionOptions = [];
    }
}