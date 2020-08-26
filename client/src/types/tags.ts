import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { LocationState } from "./routes";

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

export type TagFormProps = {
  tagId?: string;
  isUpdate: boolean;
};

export type TagsHookState = {
  tags: Tag[];
  loadingTags: boolean;
  getTags: () => Promise<Tag[] | Error>;
  createTag: (tagName: string, tagColor: string) => Promise<Tag | Error>; // tag created
  updateTag: (
    tagId: string,
    tagName: string,
    tagColor: string
  ) => Promise<Tag | Error>; // tag updated
  deleteTag: (tagId: string) => Promise<boolean | Error>;
};

// would return object of errors to define into respective fields
export type TagValidatorState = {
  tagErrors: Object;
  validateTagName: (tagName: string) => boolean; // proper length
  validateTagColor: (tagColor: string) => boolean; // proper color format HEX
  validateUserId: (id: string) => boolean; // matches the logged in user
};

export type TagPageParams = { id: string };

export type TagDashboardPageProps = RouteComponentProps<
  {},
  StaticContext,
  LocationState
>;
