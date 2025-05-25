import { Button, Container, Typography } from "@mui/material";
import { useStore } from "../store";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Result = () => {
    const { state, dispatch } = useStore();

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
                onClick={() => dispatch({ type: "resestQuestions" })}
            >
                Làm lại bài
            </Button>
        </Container>
    );
};

export default Result;
