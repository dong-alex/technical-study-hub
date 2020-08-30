import QuestionActions from "../actions/questionActions";
import { Question, QuestionsReducerState, Tag } from "../../types";

export const QUESTIONS_INITIAL_STATE = {
  questions: [],
  loadingQuestions: true,
};

const filterOutQuestions = (filteredId: string, questions: Question[]) =>
  questions.filter((question: Question) => question._id !== filteredId);

export const questionsReducer = (state: QuestionsReducerState, action: any) => {
  const { payload, type } = action;
  const { questions } = state;

  let newQuestions;

  switch (type) {
    case QuestionActions.ADDED_QUESTION:
      return {
        questions: [...questions, payload.addedQuestion],
        loadingQuestions: false,
      };
    case QuestionActions.FETCHED_QUESTIONS:
      return {
        // completely override - previously would be [] - use other actions for changes
        questions: [...payload.questions],
        loadingQuestions: false,
      };
    case QuestionActions.EDITED_QUESTION:
      newQuestions = filterOutQuestions(payload.question._id, questions);
      return {
        ...state,
        questions: [...newQuestions, payload.question],
      };
    case QuestionActions.REMOVED_QUESTION:
      newQuestions = filterOutQuestions(payload.deletedQuestionId, questions);
      return {
        ...state,
        questions: newQuestions,
      };
    case QuestionActions.INTERMEDIATE:
      return {
        ...state,
        loadingQuestions: true,
      };
    default:
      throw new Error("Unhandled question action.");
  }
};
