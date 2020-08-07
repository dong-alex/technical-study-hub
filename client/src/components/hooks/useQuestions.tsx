import React, { useState, useEffect } from "react";
import { Tag } from "./useTags";

type Question = {
	name: string;
	difficulty: string; // needs to be enum
	tags: Tag[];
	userId: string;
};

const useQuestions = () => {
	const [questions, setQuestions] = useState<Question[]>([]);

	// TODO: axios get /api/v1/questions
	const getQuestions = async () => {};

	// TODO: axios get /api/v1/questions/:questionId
	const getQuestion = async () => {};

	// TODO: axios delete question
	const deleteQuestion = async () => {};
	// TODO: axios update question
	const updateQuestion = async () => {};

	return { questions };
};

export default useQuestions;
