import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { LocationState } from "./routes";
import { Tag } from "./tags";

export type Question = {
  _id: string;
  name: string;
  difficulty: string;
  tags: Tag[];
  notes: string[];
  url: string;
  userId: string;
  createdDate: Date;
};

export type QuestionsReducerState = {
  questions: Question[];
  loadingQuestions: boolean;
};

export type QuestionsHookState = {
  questions: Question[];
  loadingQuestions: boolean;
  createQuestion: (
    name: string,
    difficulty: string,
    tags: string[],
    notes: string[],
    url: string
  ) => Promise<Question | Error>;
  updateQuestion: (
    questionId: string,
    questionName: string,
    difficulty: string,
    attachedTags: string[], // reference representation - populated on request
    notes: string[],
    url: string
  ) => Promise<Question | Error>;
  deleteQuestion: (questionId: string) => Promise<boolean | Error>;
};

export type QuestionValidatorState = {
  questionErrors: Object;
  validateQuestionName: (name: string) => boolean; // within length
  validateUrl: (url: string) => boolean; // contains leetcode.com/problems
  validateDifficulty: (difficulty: string) => boolean; // handled internally
  validateNotes: (notes: string[]) => boolean; // no null notes
  validUserId: (id: string) => boolean; // should match to the logged in user
  validateTags: (tags: Tag[]) => boolean; // have tags if available
};

export type QuestionPageParams = { id: string };

export type QuestionDashboardPageProps = RouteComponentProps<
  {},
  StaticContext,
  LocationState
>;
