import React, { createContext, useContext, FunctionComponent } from "react";
import useTags from "./useTags";
import useQuestions from "./useQuestions";

export const DataContext = createContext<any | null>(null);

// main hub of all ooperations for tags and questions
export const DataProvider: FunctionComponent<{}> = ({ children }) => {
  const { tags, loadingTags, createTag, updateTag, deleteTag } = useTags();
  const {
    questions,
    loadingQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  } = useQuestions();

  // custom hooks to handle the logic - dispatch to retain the new state to distribute - CRUD API used to handle the global state

  // TODO: create the intermediate states per request for the loading states

  return (
    <DataContext.Provider
      value={{
        tags,
        createTag,
        updateTag,
        deleteTag,
        questions,
        createQuestion,
        updateQuestion,
        deleteQuestion,
        loadingQuestions,
        loadingTags,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataProvider = () => useContext(DataContext);
