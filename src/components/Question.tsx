import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { lightBlue, lightGreen } from "@mui/material/colors";

interface State {
  score: number;
  questions: Array<{
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
  }>;
  index: number;
}

const decodeHTML = function (html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

function Question(): JSX.Element {
  const [questions, setQuestions] = useState<
    Array<{
      category: string;
      type: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      incorrect_answers: Array<string>;
    }>
  >([]);
  const [answerSelected, setAnswerSelected] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState<Array<string>>([]);

  const score = useSelector((state: State) => state.score);
  const encodedQuestions = useSelector((state: State) => state.questions);

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map((q) => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
      };
    });

    setQuestions(decodedQuestions);
  }, [encodedQuestions]);
  const questionIndex = useSelector((state: State) => state.index);

  const dispatch = useDispatch();

  const question = questions[questionIndex];
  const answer = question && question.correct_answer;

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  useEffect(() => {
    if (!question) {
      return;
    }
    const answers = [...question.incorrect_answers];
    answers.splice(
      getRandomInt(question.incorrect_answers.length),
      0,
      question.correct_answer
    );

    setOptions(answers);
  }, [question]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setAnswerSelected(true);
    setSelectedAnswer(event.currentTarget.textContent);

    if (event.currentTarget.textContent === answer) {
      dispatch({
        type: "SET_SCORE",
        score: score + 1,
      });
    }

    if (questionIndex + 1 <= questions.length) {
      setTimeout(() => {
        setAnswerSelected(false);
        setSelectedAnswer(null);

        dispatch({
          type: "SET_INDEX",
          index: questionIndex + 1,
        });
      }, 2000);
    }
  };

  const getClass = (option: string) => {
    if (!answerSelected) {
      return ``;
    }

    if (option === answer) {
      return `correct`;
    }

    if (option === selectedAnswer) {
      return `selected`;
    }

    return ``;
  };

  if (!question) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Typography color={lightBlue[400]}>
          Question {questionIndex + 1}
        </Typography>
        <Typography color={lightGreen[400]}>
          Score: {score} / {questions.length}
        </Typography>
      </Box>
      <Typography variant="h6" marginBottom="1.5rem">
        {question.question}
      </Typography>
      <ul>
        {options.map((option, i) => (
          <li
            key={i}
            onClick={handleListItemClick}
            className={getClass(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
