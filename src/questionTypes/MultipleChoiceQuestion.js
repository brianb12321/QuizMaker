import {QuestionItem} from "../QuestionItem";

export class MultipleChoiceQuestion extends QuestionItem {
    questionOptions;

    constructor(questionId, questionName) {
        super(questionId, "multipleChoice", questionName);
    }
}