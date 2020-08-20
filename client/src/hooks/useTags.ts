import React, { useState, useEffect } from "react";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";
import { Tag } from "./reducers/tagsReducer";
import axios from "axios";
import TagActions from "./actions/tagActions";

// TODO: use the questions to obtain the tags <-> questions association
const useTags = () => {
  const { user, token } = useAuthProvider();

  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      await getTags();
      setLoadingTags(false);
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
  const updateTag = async (
    tagId: string,
    newTagName: string,
    newTagColor: string
  ) => {
    if (tagId === "") {
      throw new Error("Empty tag name. Please try again.");
    }

    if (!user || !token) {
      throw new Error("No user found. Please try again.");
    }

    try {
      const {
        data: { tag },
      } = await axios.put(`/api/v1/tags/${tagId}`, {
        tagName: newTagName,
        tagColor: newTagColor,
      });
      console.log(tag);

      return tag;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };

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

  const deleteTag = async (tagId: string) => {
    if (!user || !token) {
      throw new Error("No user found. Please try again.");
    }

    try {
      const {
        data: { success },
      } = await axios.delete(`/api/v1/tags/${tagId}`);
      console.log("Delete was a ", success);

      const newTags = tags.filter((tag: Tag) => tag._id !== tagId);
      setTags(newTags);
      return success;
    } catch (err) {
      throw err;
    }
  };

  return {
    tags,
    loadingTags,
    getTags,
    createTag,
    updateTag,
    deleteTag,
  };
};

export default useTags;
