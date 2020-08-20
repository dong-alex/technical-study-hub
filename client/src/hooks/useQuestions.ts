import React, { useState, useEffect } from "react";
import axios from "axios";
import { Question } from "./reducers/questionsReducer";
import { Tag } from "./reducers/tagsReducer";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";

type QuestionsHookState = {
  questions: Question[];
  loadingQuestions: boolean;
  createQuestion: (
    name: string,
    difficulty: string,
    tags: string[]
  ) => Promise<Question | Error>;
  updateQuestion: (
    questionId: string,
    questionName: string,
    attachedTags: string[], // reference representation - populated on request
    difficulty?: DifficultyOptions
  ) => Promise<boolean | Error>;
};

export type DifficultyOptions = "EASY" | "MEDIUM" | "HARD" | string;

const useQuestions = (): QuestionsHookState => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
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
      setQuestions(questions);
      setLoadingQuestions(false);
      return questions;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await getQuestions();
    };
    fetch();
  }, []);

  const createQuestion = async (
    name: string,
    difficulty: DifficultyOptions,
    tags: string[]
  ) => {
    if (name === "") {
      throw new Error("Empty name. Please try again.");
    }

    if (!user || !token) {
      throw new Error("No user found. Please try again.");
    }

    try {
      const {
        data: { question },
      } = await axios.post("/api/v1/questions", { name, difficulty, tags });
      setQuestions([...questions, question]);
      return question;
    } catch (err) {
      throw err;
    }
  };

  // TODO: axios get /api/v1/questions/:questionId
  const getQuestion = async () => {};

  // TODO: axios delete question DELETE /api/v1/questions
  const deleteQuestion = async () => {};

  // TODO: axios update question PUT /api/v1/questions
  const updateQuestion = async (
    questionId: string,
    difficulty: string,
    tags: string[]
  ) => {
    console.log(questionId, difficulty, tags);
    return true;
  };

  return {
    questions,
    createQuestion,
    updateQuestion,
    loadingQuestions,
  };
};

export default useQuestions;
