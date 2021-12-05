import { writable } from "svelte/store";

export let quizSessions = writable(JSON.parse(window.sessionStorage.getItem("quizSessions")) ?? []);