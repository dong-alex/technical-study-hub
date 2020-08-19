import React, { useState, useEffect } from "react";
import axios from "axios";
import { Question } from "./reducers/questionsReducer";
import { Tag } from "./reducers/tagsReducer";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";

type QuestionsHookState = {
  questions: Question[];
  getQuestions: () => Promise<Question[] | Error>;
};

const useQuestions = (): QuestionsHookState => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const { user, token } = useAuthProvider();

  // TODO: axios get /api/v1/questions
  const getQuestions = async () => {
    if (!user || !token) {
      throw new Error("No user found. Please try again.");
    }

    try {
      const {
        data: { questions },
      } = await axios.get("/api/v1/questions");
      return questions;
    } catch (err) {
      throw err;
    }
  };

  // TODO: axios get /api/v1/questions/:questionId
  const getQuestion = async () => {};

  // TODO: axios delete question DELETE /api/v1/questions
  const deleteQuestion = async () => { };
  
  // TODO: axios update question PUT /api/v1/questions
  const updateQuestion = async () => {};

  return { questions, getQuestions };
};

export default useQuestions;
