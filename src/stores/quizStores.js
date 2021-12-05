import { readable, writable } from "svelte/store";
import { browser } from "$app/env";
import {Quiz} from "../Quiz";

function ignoreFeedbackInformation(key, value) {
    if(key == "feedback") return undefined;
    return value;
}

export function saveQuiz(quiz) {
    if(browser) {
        const quizzes = JSON.parse(window.localStorage.getItem("quizzes"));
        const index = quizzes.findIndex(q => q.quizId == quiz.quizId);
        if(index != -1) {
            quizzes[index] = quiz;
            window.localStorage.setItem("quizzes", JSON.stringify(quizzes, ignoreFeedbackInformation));
            return true;
        }
    }
    return false;
}
export function getQuiz(quizGuid) {
    if(browser) {
        const quizzes = JSON.parse(window.localStorage.getItem("quizzes"));
        const quiz = quizzes.find(quiz => quiz.quizId == quizGuid);
        return new Quiz(quiz.quizId, quiz.name, quiz.description, quiz.questionItems);
    }
    return null;
}
export function addQuiz(quiz) {
    if(browser) {
        const quizzes = JSON.parse(window.localStorage.getItem("quizzes")) ?? [];
        quizzes.push(quiz);
        window.localStorage.setItem("quizzes", JSON.stringify(quizzes, ignoreFeedbackInformation));
        return true;
    }
    return false;
}
export const quizEnumeration = readable([], set => {
    //Get data from browser storage.
    if(browser) {
        const quizzes = JSON.parse(window.localStorage.getItem("quizzes"));
        const enumeration = [];
        if(quizzes != null) {
            for(let quiz of quizzes) {
                enumeration.push({
                    quizId: quiz.quizId,
                    name: quiz.name,
                    description: quiz.description
                });
            }
        }
        set(enumeration);
    }

    return function stop() {
        //Does not need to do anything
    };
});

export const workingQuiz = writable();