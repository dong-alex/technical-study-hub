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

  switch (type) {
    case QuestionActions.ADDED_QUESTION:
      return {
        questions: [...questions, payload.addedQuestion],
        loadingQuestions: false,
      };
    case QuestionActions.FETCHED_QUESTIONS:
      return {
        questions: [...questions, ...payload.questions],
        loadingQuestions: false,
      };
    case QuestionActions.EDITED_QUESTION:
      return {
        ...state,
        questions: [
          ...filterOutQuestions(payload.question._id, questions),
          payload.question,
        ],
      };
    case QuestionActions.REMOVED_QUESTION:
      const newQuestions = filterOutQuestions(
        payload.deletedQuestionId,
        questions
      );
      console.log(newQuestions);
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
