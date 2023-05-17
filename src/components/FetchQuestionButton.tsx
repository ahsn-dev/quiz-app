import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

interface State {
  options: {
    question_category: string;
    question_difficulty: string;
    question_type: string;
    amount_of_questions: number;
  };
  index: number;
}

interface Props {
  text: string;
}

function FetchQuestionButton(props: Props): JSX.Element {
  const questionCategory = useSelector(
    (state: State) => state.options.question_category
  );
  const questionDifficulty = useSelector(
    (state: State) => state.options.question_difficulty
  );
  const questionType = useSelector(
    (state: State) => state.options.question_type
  );
  const questionAmount = useSelector(
    (state: State) => state.options.amount_of_questions
  );
  const questionIndex = useSelector((state: State) => state.index);

  const dispatch = useDispatch();

  const setLoading = (value: boolean) => {
    dispatch({
      type: "CHANGE_LOADING",
      loading: value,
    });
  };

  const setQuestions = (
    value: Array<{
      category: string;
      type: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      incorrect_answers: Array<string>;
    }>
  ) => {
    dispatch({
      type: "SET_QUESTIONS",
      questions: value,
    });
  };

  const handleQuery = async () => {
    let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`;

    if (questionCategory.length) {
      apiUrl = apiUrl.concat(`&category=${questionCategory}`);
    }

    if (questionDifficulty.length) {
      apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`);
    }

    if (questionType.length) {
      apiUrl = apiUrl.concat(`&type=${questionType}`);
    }

    setLoading(true);

    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setQuestions(response.results);
        setLoading(false);
      });

    if (questionIndex > 0) {
      dispatch({
        type: "SET_INDEX",
        index: 0,
      });

      dispatch({
        type: "SET_SCORE",
        score: 0,
      });
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleQuery}>
      {props.text}
    </Button>
  );
}

export default FetchQuestionButton;
