// validates inputs for tags
import React, { useEffect, useState } from "react";
import validator from "validator";

// would return object of errors to define into respective fields
type TagValidatorState = {
  tagErrors: Object;
  validateTagName: (tagName: string) => boolean;
  validateTagColor: (tagColor: string) => boolean;
};

const useTagValidator = (): TagValidatorState => {
  const [tagErrors, setTagErrors] = useState<object>({});

  const validateTagName = (tagName: string) => {
    return true;
  };

  const validateTagColor = (tagColor: string) => {
    return true;
  };

  return {
    tagErrors,
    validateTagName,
    validateTagColor,
  };
};

export default useTagValidator;
