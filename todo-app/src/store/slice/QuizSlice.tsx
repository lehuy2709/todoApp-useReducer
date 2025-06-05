import { createSlice } from "@reduxjs/toolkit";

export interface QuizState {
    currentIndex: number;
    score: number;
    selectedAnswer: string | null;
    showAnswer: boolean;
    finished: boolean;
}

const initialState: QuizState = {
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    showAnswer: false,
    finished: false,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        selectAnswer: (
            state,
            action
        ) => {
            state.selectedAnswer = action.payload.selected;
            state.showAnswer = true;
            if (
                action.payload.selected &&
                action.payload.selected === action.payload.correct
            ) {
                state.score += 1;
            }
        },
        nextQuestion: (state, action) => {
            if (state.currentIndex + 1 >= action.payload) {
                state.finished = true;
            } else {
                state.currentIndex += 1;
                state.selectedAnswer = null;
                state.showAnswer = false;
            }
        },
        restart: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { selectAnswer, nextQuestion, restart } = quizSlice.actions;
export default quizSlice.reducer;
