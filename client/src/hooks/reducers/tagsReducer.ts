import TagActions from "../actions/tagActions";

export type Tag = {
  _id: string;
  tagName: string;
  tagColor: string;
  createdDate: Date;
};

export type TagsReducerState = {
  tags: Tag[];
  loadingTags: boolean;
};

export const TAGS_INITIAL_STATE = {
  tags: [],
  loadingTags: true,
};

const filterOutTag = (filteredId: string, tags: Tag[]) =>
  tags.filter((tag: Tag) => tag._id !== filteredId);

// TODO: action state
export const tagsReducer = (state: TagsReducerState, action: any) => {
  const { payload, type } = action;
  const { tags } = state;

  switch (type) {
    case TagActions.FETCHED_TAGS:
      return {
        ...state,
        tags: payload.tags,
        loadingTags: false,
      };
    case TagActions.ADDED_TAG:
      // payload : Tag[]
      return {
        ...state,
        tags: [...tags, payload],
        loadingTags: false,
      };
    case TagActions.REMOVED_TAG:
      return {
        ...state,
        tags: filterOutTag(payload.deletedTagId, tags),
        loadingTags: false,
      };
    case TagActions.UPDATED_TAG:
      return {
        ...state,
        tags: [...filterOutTag(payload.tag._id, tags), payload.tag],
        loadingTags: false,
      };
    case TagActions.INTERMEDIATE:
      return {
        ...state,
        loadingTags: true,
      };
    default:
      throw new Error("Invalid tags action. Please try again.");
  }
};
