import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Container,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import Result from "./Result";
import { useSelector, useDispatch } from "react-redux";
import { selectAnswer, nextQuestion } from "../store/slice/QuizSlice";


const questions = [
    {
        id: 1,
        question: "Thủ đô của Việt Nam là gì?",
        options: ["Hồ Chí Minh", "Đà Nẵng", "Hà Nội", "Huế"],
        answer: "Hà Nội",
    },
    {
        id: 2,
        question: "React là thư viện của ngôn ngữ nào?",
        options: ["Python", "Java", "JavaScript", "C#"],
        answer: "JavaScript",
    },
    {
        id: 3,
        question: "Ai là người sáng lập Microsoft?",
        options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
        answer: "Bill Gates",
    },
    {
        id: 4,
        question: "CSS viết tắt của gì?",
        options: [
            "Colorful Style Sheets",
            "Computer Styled Sections",
            "Cascading Style Sheets",
            "Creative Style System",
        ],
        answer: "Cascading Style Sheets",
    },
    {
        id: 5,
        question: "HTML là viết tắt của?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "Hyper Transfer Markup Language",
        ],
        answer: "HyperText Markup Language",
    },
    {
        id: 6,
        question: "Ngôn ngữ nào chạy trên trình duyệt?",
        options: ["Python", "JavaScript", "Java", "C++"],
        answer: "JavaScript",
    },
    {
        id: 7,
        question: "Công cụ nào để quản lý version code?",
        options: ["NPM", "Yarn", "Git", "Docker"],
        answer: "Git",
    },
    {
        id: 8,
        question: "Framework phổ biến của JavaScript?",
        options: ["React", "Laravel", "Django", "Ruby on Rails"],
        answer: "React",
    },
    {
        id: 9,
        question: "AI viết tắt của?",
        options: ["Artificial Idea", "Auto Intelligence", "Artificial Intelligence", "Auto Input"],
        answer: "Artificial Intelligence",
    },
    {
        id: 10,
        question: "JSX là gì trong React?",
        options: [
            "JavaScript Extension",
            "Java Syntax XML",
            "JavaScript XML",
            "JavaScalable XUI",
        ],
        answer: "JavaScript XML",
    }
];



const Quiz = () => {


    // @ts-ignore
    const state = useSelector((state) => state.quiz);     
    const dispatch = useDispatch();


    useEffect(() => {
        if (state.showAnswer) {
            const timer = setTimeout(() => {
                dispatch(nextQuestion(questions.length));
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [state.showAnswer, dispatch, state.currentIndex]);

    const currentIndex = state.currentIndex;
    const currentQuestion = useMemo(() => {
        return questions[state.currentIndex];
    }, [state.currentIndex]);

    const getOptionStyle = (option: string) => {
        const correct = currentQuestion.answer;

        if (!state.showAnswer) {

            return option === state.selectedAnswer
                ? { backgroundColor: "skyblue" }
                : {};
        }

        if (option === correct) {
            return { backgroundColor: "green", color: "white" };
        }

        if (option === state.selectedAnswer && option !== correct) {
            return { backgroundColor: "red", color: "white" };
        }

        return {};
    };



    if (state.finished) {
        return <Result />;
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Câu {currentIndex + 1}: {currentQuestion.question}
                    </Typography>

                    <Stack spacing={2} mt={3}>
                        {currentQuestion.options.map((option, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    ...getOptionStyle(option),
                                    textTransform: "none",
                                    justifyContent: "flex-start",
                                    fontSize: 16,
                                    py: 1.5,
                                }}
                                onClick={() => {
                                    if (!state.showAnswer) {
                                        dispatch(selectAnswer({
                                            selected: option,
                                            correct: currentQuestion.answer,
                                        }));
                                    }
                                }}
                            >
                                {option}
                            </Button>
                        ))}
                    </Stack>

                    <Box mt={4} textAlign="right">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                dispatch(nextQuestion(questions.length))
                            }
                        >
                            Câu tiếp theo
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Quiz;
