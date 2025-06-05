import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slice/QuizSlice";

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
    },
});