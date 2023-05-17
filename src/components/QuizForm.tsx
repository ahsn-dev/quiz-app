import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress, Container } from "@mui/material";
import FetchQuestionButton from "./FetchQuestionButton";

interface Options {
  id: number;
  name: string;
}

interface State {
  options: {
    loading: boolean;
    question_category: string;
    question_difficulty: string;
    question_type: string;
    amount_of_questions: number;
  };
}

function QuizForm(): JSX.Element {
  const [options, setOptions] = useState<Array<Options> | null>(null);

  const loading = useSelector((state: State) => state.options.loading);

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

  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;

    const handleLoadingChange = (value: boolean) => {
      dispatch({
        type: "CHANGE_LOADING",
        loading: value,
      });
    };

    handleLoadingChange(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        handleLoadingChange(false);
        setOptions(response.trivia_categories);
      });
  }, [setOptions, dispatch]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: "CHANGE_CATEGORY",
      question_category: event.target.value,
    });
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: "CHANGE_DIFFICULTY",
      question_difficulty: event.target.value,
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "CHANGE_TYPE",
      question_type: event.target.value,
    });
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_AMOUNT",
      amount_of_questions: Number(event.target.value),
    });
  };

  if (!loading) {
    return (
      <Container>
        <h1>Welcome to Quiz App</h1>
        <Box display="flex" flexDirection="column" gap="1rem">
          <div>
            <h2>Select Category:</h2>
            <select value={questionCategory} onChange={handleCategoryChange}>
              <option>All</option>
              {options &&
                options.length &&
                options.map((option) => (
                  <option value={option.id} key={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <h2>Select Difficulty:</h2>
            <select
              value={questionDifficulty}
              onChange={handleDifficultyChange}
            >
              <option value="" key="difficulty-0">
                All
              </option>
              <option value="easy" key="difficulty-1">
                Easy
              </option>
              <option value="medium" key="difficulty-2">
                Medium
              </option>
              <option value="hard" key="difficulty-3">
                Hard
              </option>
            </select>
          </div>
          <div>
            <h2>Select Question Type:</h2>
            <select value={questionType} onChange={handleTypeChange}>
              <option value="" key="type-0">
                All
              </option>
              <option value="multiple" key="type-1">
                Multiple Choice
              </option>
              <option value="boolean" key="type-2">
                True/False
              </option>
            </select>
          </div>
          <div style={{ marginBottom: "3rem" }}>
            <h2>Amount of Questions:</h2>
            <input value={questionAmount} onChange={handleAmountChange} />
          </div>
        </Box>

        <FetchQuestionButton text="Get started" />
      </Container>
    );
  }

  return <CircularProgress color="inherit" />;
}

export default QuizForm;
