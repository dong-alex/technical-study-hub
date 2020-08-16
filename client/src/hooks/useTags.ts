import React, { useState, useEffect } from "react";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";
import { Tag } from "./reducers/tagsReducer";
import axios from "axios";
import TagActions from "./actions/tagActions";

const useTags = () => {
  const { user, token } = useAuthProvider();

  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getTags();
    };
    fetch();
  }, []);

  const getTags = async () => {
    // not authenticated or no user associated to the token
    if (!user || !token) {
      throw new Error("No user found. Please try again.");
    }

    const { _id } = user;
    console.log(_id);

    try {
      const {
        data: { tags: tagsResponse },
      } = await axios.get("/api/v1/tags");

      setTags(tagsResponse);
      return true;
    } catch (err) {
      throw new Error(
        "There was an error with getting tags. Please try again."
      );
    }
  };

  // TODO: update the tag information - needs to be given the ID to change
  const updateTag = async (tagId: string) => {};

  // TODO: tag information to create a new tag such as name and color
  const createTag = async (tagName: string, tagColor: string) => {
    // TODO: input validation
    if (tagName === "") {
      throw new Error("Empty tag name. Please try again.");
    }

    if (!user || !token) {
      throw new Error("No user found. Please try again.");
    }

    try {
      const {
        data: { tag },
      } = await axios.post("/api/v1/tags", { tagName, tagColor });
      setTags([...tags, tag]);
      return true;
    } catch (err) {
      throw err;
    }
  };

  // TODO: delete request axios
  const deleteTag = async (tagId: string) => {};

  return {
    tags,
    getTags,
    createTag,
  };
};

export default useTags;
