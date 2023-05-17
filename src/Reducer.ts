interface Options {
  loading: boolean;
  question_category: string;
  question_difficulty: string;
  question_type: string;
  amount_of_questions: number;
}

interface State {
  options: Options;
  questions: Array<Record<string, unknown>>;
  index: number;
  score: number;
}

type Action =
  | { type: "CHANGE_LOADING"; loading: boolean }
  | { type: "CHANGE_CATEGORY"; question_category: string }
  | { type: "CHANGE_DIFFICULTY"; question_difficulty: string }
  | { type: "CHANGE_TYPE"; question_type: string }
  | { type: "CHANGE_AMOUNT"; amount_of_questions: number }
  | { type: "SET_QUESTIONS"; questions: Array<Record<string, unknown>> }
  | { type: "SET_INDEX"; index: number }
  | { type: "SET_SCORE"; score: number };

const initState: State = {
  options: {
    loading: false,
    question_category: ``,
    question_difficulty: ``,
    question_type: ``,
    amount_of_questions: 8,
  },
  questions: [],
  index: 0,
  score: 0,
};

const Reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case "CHANGE_LOADING":
      return {
        ...state,
        options: {
          ...state.options,
          loading: action.loading,
        },
      };

    case "CHANGE_CATEGORY":
      return {
        ...state,
        options: {
          ...state.options,
          question_category: action.question_category,
        },
      };

    case "CHANGE_DIFFICULTY":
      return {
        ...state,
        options: {
          ...state.options,
          question_difficulty: action.question_difficulty,
        },
      };

    case "CHANGE_TYPE":
      return {
        ...state,
        options: {
          ...state.options,
          question_type: action.question_type,
        },
      };

    case "CHANGE_AMOUNT":
      return {
        ...state,
        options: {
          ...state.options,
          amount_of_questions: action.amount_of_questions,
        },
      };

    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };

    case "SET_INDEX":
      return {
        ...state,
        index: action.index,
      };

    case "SET_SCORE":
      return {
        ...state,
        score: action.score,
      };

    default:
      return state;
  }
};

export default Reducer;
