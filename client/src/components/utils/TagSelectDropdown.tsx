import React from "react";
import { Select } from "react-materialize";
import { Tag } from "../../hooks/reducers/tagsReducer";
import useTags from "../../hooks/useTags";

const TagSelectDropdown = () => {
  const { tags } = useTags();

  return (
    <Select
      id="tags-select"
      multiple
      options={{
        dropdownOptions: {
          alignment: "left",
          autoTrigger: true,
          closeOnClick: true,
          constrainWidth: true,
          coverTrigger: true,
          hover: false,
          inDuration: 150,
          outDuration: 250,
        },
      }}
    >
      <option disabled value="">
        Add tags
      </option>
      {tags.map((tag: Tag) => (
        <option key={tag._id} value={tag._id}>
          {tag.tagName}
        </option>
      ))}
    </Select>
  );
};

export default TagSelectDropdown;
