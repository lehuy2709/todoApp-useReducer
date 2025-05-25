export interface State {
    currentIndex: number,
    score: number,
    selectedAnswer: string | null,
    showAnswer: boolean,
    finished: boolean,
};

export const initialState: State = {
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    showAnswer: false,
    finished: false,
}

const nextQuestion = (state: State, action: any): State => {
    const isLast: number = state.currentIndex + 1
    if (isLast >= action.totalQuestion) {
        return {
            ...state,
            finished: true
        }
    }
    else {
        return {
            ...state,
            currentIndex: isLast,
            selectedAnswer: null,
            showAnswer: false,
        }

    }
}

const selectAnswer = (state: State, action: any) => {

    let isCorrect: any
    if (action.payload.selected === action.payload.correct) {
        isCorrect = true
    }
    return {
        ...state,
        selectedAnswer: action.payload.selected,
        showAnswer: true,
        score: isCorrect ? state.score + 1 : state.score
    }
}

const resestQuestions = () => {
    return {
        currentIndex: 0,
        score: 0,
        selectedAnswer: null,
        showAnswer: false,
        finished: false,
    };
}

const actionHandler: any = {
    nextQuestion: nextQuestion,
    selectAnswer: selectAnswer,
    resestQuestions: resestQuestions
}

const reducer = (state: State, action: any): State => {
    return actionHandler[action.type](state, action)
}
export default reducer