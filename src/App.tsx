import { useSelector } from "react-redux";
import Question from "./components/Question";
import QuizForm from "./components/QuizForm";
import ShowResultScreen from "./components/ShowResultScreen";
import "./App.css";

function App(): JSX.Element {
  const questions = useSelector((state: any) => state.questions);
  const questionIndex = useSelector((state: any) => state.index);

  let component: JSX.Element;

  if (questions.length && questionIndex + 1 <= questions.length) {
    component = <Question />;
  } else if (!questions.length) {
    component = <QuizForm />;
  } else {
    component = <ShowResultScreen />;
  }

  return (
    <div className="App">
      <div className="app-container">{component}</div>
    </div>
  );
}

export default App;
