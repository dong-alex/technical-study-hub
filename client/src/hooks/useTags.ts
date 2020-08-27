import { useEffect, useReducer } from "react";
import axios from "axios";
import TagActions from "./actions/tagActions";
import { tagsReducer, TAGS_INITIAL_STATE } from "./reducers/tagsReducer";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";
import { Tag, TagsHookState } from "../types";

// API service throws the errors given by the server. Caller handles thrown errors.
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
  }, [authenticated]);

  const getTags = async (): Promise<Tag[] | Error> => {
    try {
      const {
        status,
        data: { tags: tagsResponse, message },
      } = await axios.get("/api/v1/tags");

      if (status === 200) {
        dispatch({
          type: TagActions.FETCHED_TAGS,
          payload: { tags: tagsResponse },
        });

        return tagsResponse;
      }

      throw Error(message);
    } catch (err) {
      console.log("Error grabbing tags", err.message);
      return []; // internal function to handle with
    }
  };

  const updateTag = async (
    tagId: string,
    newTagName: string,
    newTagColor: string
  ): Promise<Tag | Error> => {
    const {
      status,
      data: { tag, message },
    } = await axios.put(`/api/v1/tags/${tagId}`, {
      tagName: newTagName,
      tagColor: newTagColor,
    });

    // succesful requests
    if (status === 200) {
      dispatch({ type: TagActions.UPDATED_TAG, payload: { tag } });
      return tag;
    }

    // database errors or invalid data throws the specific message associated
    throw Error(message);
  };

  const createTag = async (
    tagName: string,
    tagColor: string
  ): Promise<Tag | Error> => {
    try {
      const {
        data: { tag },
      } = await axios.post("/api/v1/tags", { tagName, tagColor });
      dispatch({ type: TagActions.ADDED_TAG, payload: tag });
      return tag;
    } catch (err) {
      // there has been an error somewhere - improper validation
      throw err;
    }
  };

  // returns true on succesful deletion, otherwise an error
  const deleteTag = async (tagId: string): Promise<boolean | Error> => {
    try {
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
