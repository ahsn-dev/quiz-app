import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Box } from "@mui/material";

interface State {
  score: number;
}

function ShowResultScreen(): JSX.Element {
  const score = useSelector((state: State) => state.score);

  const dispatch = useDispatch();

  const replay = () => {
    dispatch({
      type: "SET_INDEX",
      index: 0,
    });

    dispatch({
      type: "SET_SCORE",
      score: 0,
    });
  };

  const settings = () => {
    dispatch({
      type: "SET_QUESTIONS",
      questions: [],
    });

    dispatch({
      type: "SET_SCORE",
      score: 0,
    });
  };

  return (
    <Box textAlign="center">
      <Typography variant="h5" marginBottom="2rem">
        Final Score: {score}
      </Typography>
      <Button
        variant="contained"
        style={{ marginBottom: "1rem" }}
        color="primary"
        onClick={replay}
      >
        Try again
      </Button>
      <Button variant="contained" color="secondary" onClick={settings}>
        Back to Quiz App
      </Button>
    </Box>
  );
}

export default ShowResultScreen;
