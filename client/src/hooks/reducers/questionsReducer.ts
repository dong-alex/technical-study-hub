import QuestionActions from "../actions/questionActions";
import { Tag } from "./tagsReducer";

export type Question = {
  _id: string;
  name: string;
  difficulty: string; // needs to be enum
  tags: Tag[];
  userId: string;
  createdDate: Date;
};

export type QuestionsReducerState = {
  questions: Question[];
  loadingQuestions: boolean;
};

export const QUESTIONS_INITIAL_STATE = {
  questions: [],
  loadingQuestions: true,
};

export const questionsReducer = (state: QuestionsReducerState, action: any) => {
  const { payload } = action;
  const { questions } = state;

  switch (action.type) {
    case QuestionActions.ADDED_QUESTION:
      // TODO: check for payload data
      return {
        questions: [...questions, payload],
        loadingQuestions: false,
      };
    case QuestionActions.REMOVED_QUESTION:
      const newQuestions = questions.filter(
        (q) => q._id != payload.question._id
      );
      return {};
    case QuestionActions.HANDLED_QUESTION:
      return {
        ...state,
        loadingQuestions: true,
      };
    default:
      throw new Error("Unhandled question action.");
  }
};
