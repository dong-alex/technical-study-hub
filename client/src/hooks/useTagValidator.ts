// validates inputs for tags
import React, { useEffect, useState } from "react";
import validator from "validator";
import { TagValidatorState } from "../types";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";

const useTagValidator = (): TagValidatorState => {
  const [tagErrors, setTagErrors] = useState<object>({});
  const { user, authenticated } = useAuthProvider();

  const validateTagName = (tagName: string) => {
    return true;
  };

  const validateTagColor = (tagColor: string) => {
    return true;
  };

  const validateUserId = () => {

    // no user at all
    if (!user) {

    }

    // user ID does not match 
    return true;
  };

  return {
    tagErrors,
    validateTagName,
    validateTagColor,
    validateUserId,
  };
};

export default useTagValidator;
