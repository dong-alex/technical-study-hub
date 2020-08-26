import { useEffect, useReducer } from "react";
import axios from "axios";
import TagActions from "./actions/tagActions";
import { tagsReducer, TAGS_INITIAL_STATE } from "./reducers/tagsReducer";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";
import { Tag, TagsHookState } from "../types";

// TODO: use the questions to obtain the tags <-> questions association
const useTags = (): TagsHookState => {
  const [tagState, dispatch] = useReducer(tagsReducer, TAGS_INITIAL_STATE);
  const { tags, loadingTags } = tagState;
  const { user, token, authenticated } = useAuthProvider();

  useEffect(() => {
    const fetch = async () => {
      // stops initial runs before authentication completes
      if (!authenticated) {
        return;
      }
      await getTags();
    };
    fetch();
  }, []);

  const getTags = async (): Promise<Tag[] | Error> => {
    // not authenticated or no user associated to the token
    if (!user || !token) {
      throw new Error("No user found. Please try again.");
    }

    try {
      const {
        data: { tags: tagsResponse },
      } = await axios.get("/api/v1/tags");
      dispatch({
        type: TagActions.FETCHED_TAGS,
        payload: { tags: tagsResponse },
      });

      return tagsResponse;
    } catch (err) {
      console.log("Error grabbing tags", err.message);
      return []; // internal function to handle with
    }
  };

  // TODO: update the tag information - needs to be given the ID to change
  const updateTag = async (
    tagId: string,
    newTagName: string,
    newTagColor: string
  ): Promise<Tag | Error> => {
    try {
      if (tagId === "") {
        throw new Error("Empty tag name. Please try again.");
      }

      if (!user || !token) {
        throw new Error("No user found. Please try again.");
      }

      const {
        data: { tag },
      } = await axios.put(`/api/v1/tags/${tagId}`, {
        tagName: newTagName,
        tagColor: newTagColor,
      });
      dispatch({ type: TagActions.UPDATED_TAG, payload: { tag } });
      return tag;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };

  const createTag = async (
    tagName: string,
    tagColor: string
  ): Promise<Tag | Error> => {
    // TODO: input validation

    try {
      if (tagName === "") {
        throw new Error("Empty tag name. Please try again.");
      }

      if (!user || !token) {
        throw new Error("No user found. Please try again.");
      }

      const {
        data: { tag },
      } = await axios.post("/api/v1/tags", { tagName, tagColor });
      dispatch({ type: TagActions.ADDED_TAG, payload: tag });
      return tag;
    } catch (err) {
      console.log("Error creating tag", err.message);
      throw err;
    }
  };

  const deleteTag = async (tagId: string): Promise<boolean | Error> => {
    try {
      if (!user || !token) {
        throw new Error("No user found. Please try again.");
      }
      const {
        data: { success },
      } = await axios.delete(`/api/v1/tags/${tagId}`);
      dispatch({
        type: TagActions.REMOVED_TAG,
        payload: { deletedTagId: tagId },
      });
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
