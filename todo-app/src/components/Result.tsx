import { Button, Container, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useSelector, useDispatch } from "react-redux";
import { restart } from "../store/slice/QuizSlice";

const Result = () => {
    // @ts-ignore
    const state = useSelector((state) => state.quiz);
    const dispatch = useDispatch();

    return (
        <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                <EmojiEventsIcon fontSize="large" color="warning" sx={{ verticalAlign: "middle", mr: 1 }} />
                Hoàn thành bài quiz!
            </Typography>
            <Typography variant="h5" gutterBottom>
                Bạn được {state.score} / 10 điểm
            </Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 4 }}
                onClick={() => dispatch(restart())}
            >
                Làm lại bài
            </Button>
        </Container>
    );
};

export default Result;
