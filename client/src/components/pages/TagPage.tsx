import React, {
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  useCallback,
} from "react";
import {
  Button,
  Row,
  Col,
  Table,
  TextInput,
  Dropdown,
  Pagination,
  Icon,
} from "react-materialize";
import { CirclePicker } from "react-color";
import styled from "styled-components";
import { Tag } from "../../hooks/reducers/tagsReducer";
import NavigationLayout from "../layout/NavigationLayout";
import useTags from "../../hooks/useTags";
import usePagination from "../../hooks/usePagination";

type TagPageProps = {};
type ColorPreviewProps = {
  backgroundColor: string;
};

const TagMainPage = styled.div`
  margin: 1rem;
`;

const TagNameInput = styled(TextInput)`
  width: 100%;
  height: 30px;
`;

const TableTagColor = styled.td`
  > div {
    background-color: ${(props: ColorPreviewProps) => props.backgroundColor};
    margin: 0 auto 0 auto;
    width: 20px;
    height: 20px;
  }
`;

const CustomPagination = styled(Pagination)`
  height: 100%;
  display: flex;
  justify-content: center;
  > li {
    &:first-child {
      padding: 0px;
      width: auto;
      height: auto;
    }
    &:last-child {
      padding: 0px;
      width: auto;
      height: auto;
    }

    > a {
      padding: 0;
    }

    max-width: 200px;
    padding: 0 1rem 0 1rem;
    margin: 0 1rem 0 1rem;
  }
`;

const ColorPreview = styled.div`
  height: 2rem;
  width: 2rem;
  border: 1px solid black;
  background-color: ${(props: ColorPreviewProps) => props.backgroundColor};

  &:hover {
    transform: scale(1.1);
  }
`;

const PageButton = styled(Button)`
  width: 100%;
`;

const TagForm = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
  padding: 1rem 0 1rem 0;
`;

const ColorDropdown = styled(Dropdown)`
  height: fit-content;
  width: 300px !important;
`;

const TagPage: FunctionComponent<TagPageProps> = () => {
  const { page, handlePageUp, handlePageDown } = usePagination();
  const { tags, createTag } = useTags();
  const [tableTags, setTableTags] = useState<Tag[]>([]);
  const [tagName, setTagName] = useState<string>("");
  const [tagColor, setTagColor] = useState<string>("#AAA");

  useEffect(() => {
    console.log("Page Number: ", page);
  }, [page]);

  useEffect(() => {
    console.log("Obtained tags", tags);
    // depending on the page - set the tags 10 at a time per page
    const offset = (page - 1) * 2;
    const displayTags = tags.slice(offset, offset + 2);
    setTableTags(displayTags);
  }, [tags, page]);

  const handleColorChange = ({ hex }: { hex: string }) => {
    setTagColor(hex);
  };

  // TODO: validation with the string length of total # tags
  const handleTagNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

  const handleAddTag = async (event: any) => {
    event.preventDefault();
    let success = false;
    try {
      success = await createTag(tagName, tagColor);
      return success;
    } catch (err) {
      return success;
    }
  };

  useEffect(() => {
    console.log(tagColor);
  }, [tagColor]);

  return (
    <NavigationLayout>
      <TagMainPage>
        <TagForm>
          <Col s={10} m={7}>
            <TagNameInput
              name="tagName"
              label="Tag Name"
              noLayout
              onChange={handleTagNameChange}
              value={tagName}
            />
          </Col>
          <Col s={2} m={1}>
            <ColorDropdown
              trigger={<ColorPreview backgroundColor={tagColor} />}
            >
              <CirclePicker
                color={tagColor}
                onChangeComplete={handleColorChange}
              />
            </ColorDropdown>
          </Col>
          <Col s={12} m={4}>
            <Button className="light-blue lighten-2" onClick={handleAddTag}>
              Add Tag
            </Button>
          </Col>
        </TagForm>
        <Table>
          <thead>
            <tr>
              <th data-field="id">Tag Name</th>
              <th data-field="name">Tag Color</th>
              <th data-field="price">Created On</th>
            </tr>
          </thead>
          <tbody>
            {tableTags.map((tag: Tag) => {
              return (
                <tr key={tag._id}>
                  <td>{tag.tagName}</td>
                  <TableTagColor backgroundColor={tag.tagColor}>
                    <div />
                  </TableTagColor>
                  <td>{tag.createdDate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <CustomPagination
          activePage={page}
          items={1 + tags.length / 2}
          leftBtn={
            <PageButton
              onClick={handlePageDown}
              icon={<Icon>chevron_left</Icon>}
            />
          }
          rightBtn={
            <PageButton
              onClick={handlePageUp}
              icon={<Icon>chevron_right</Icon>}
            />
          }
        />
      </TagMainPage>
    </NavigationLayout>
  );
};

export default TagPage;
