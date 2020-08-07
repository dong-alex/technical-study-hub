import React, { useState, useEffect } from "react";
import { useAuthProvider } from "../auth/AuthenticationProvider";

export type Tag = {
	name: string;
	difficulty: string; // needs to be enum
	tags: Tag[];
	userId: string;
};

const useQuestions = () => {
	const { user, token } = useAuthProvider();

	const [tags, setTags] = useState<Tag[]>([]);
	const getTags = async () => {
		// not authenticated or no user associated to the token
		if (!user || !token) {
			throw new Error("No user found. Please try again.");
		}

		const { _id } = user;
		// TODO: axios request for questions based on the user ID
	};

	// TODO: update the tag information - needs to be given the ID to change
	const updateTag = async (tagId: string) => {};

	// TODO: tag information to create a new tag such as name and color
	const createTag = async () => {};

	// TODO: delete request axios
	const deleteTag = async (tagId: string) => {};

	return {
		tags,
	};
};

export default useQuestions;
