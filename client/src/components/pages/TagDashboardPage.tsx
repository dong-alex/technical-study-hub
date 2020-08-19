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
  ProgressBar,
  TextInput,
  Dropdown,
  Modal,
  Pagination,
  Icon,
} from "react-materialize";
import { CirclePicker } from "react-color";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoadingOverlay from "../utils/LoadingOverlay";
import NavigationLayout from "../layout/NavigationLayout";
import { Tag } from "../../hooks/reducers/tagsReducer";
import useTags from "../../hooks/useTags";
import usePagination from "../../hooks/usePagination";

type TagDashboardPageProps = {};
type ColorPreviewProps = {
  backgroundColor: string;
};

const TagNameInput = styled(TextInput)`
  width: 100%;
  height: 30px;
`;

const TableContainer = styled.div`
  height: 100%;
`;

const TableTagColor = styled.td`
  > div {
    background-color: ${(props: ColorPreviewProps) => props.backgroundColor};
    margin: 0 auto 0 auto;
    width: 20px;
    height: 20px;
  }
`;

const TableActions = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-evenly;
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
  padding: 0 0 1rem 0;
`;

const ColorDropdown = styled(Dropdown)`
  height: fit-content;
  width: 300px !important;
`;

const TagDashboardPage: FunctionComponent<TagDashboardPageProps> = () => {
  const [tableTags, setTableTags] = useState<Tag[]>([]);
  const [tagName, setTagName] = useState<string>("");
  const [tagColor, setTagColor] = useState<string>("#AAA");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedTagId, setSelectedTagId] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const { tags, loadingTags, createTag, deleteTag } = useTags();
  const { page, handlePageUp, handlePageDown } = usePagination(totalPages);

  const tagsPerPage = 10;

  useEffect(() => {
    if (selectedTagId !== "" && tags.length > 0) {
      const tag = tags.find((tag: Tag) => tag._id === selectedTagId);
      setSelectedTag(tag);
    } else {
      console.log("Setting to undefined");
      setSelectedTag(undefined);
    }
  }, [selectedTagId]);

  useEffect(() => {
    setTotalPages(1 + tags.length / tagsPerPage);
  }, [tags]);

  useEffect(() => {
    console.log("Obtained tags", tags);
    // depending on the page - set the tags 10 at a time per page
    const offset = (page - 1) * tagsPerPage;
    const displayTags = tags.slice(offset, offset + tagsPerPage);
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

  // on clicking the tag name
  const handleTagClick = (tagId: string) => {
    console.log(tagId);
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      const success = await deleteTag(tagId);
      console.log(success);
      setSelectedTagId("");
      setOpenDeleteModal(false);
    } catch (err) {
      console.log("Error deleting the tag", err.message);
    } finally {
      setOpenDeleteModal(false);
    }
  };

  const handleDeleteModalOpen = (tagId: string) => {
    setSelectedTagId(tagId);
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedTagId("");
    setOpenDeleteModal(false);
  };

  return (
    <NavigationLayout>
      <h4>Tag Dashboard</h4>
      <h6>Create New Tag</h6>
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
          <ColorDropdown trigger={<ColorPreview backgroundColor={tagColor} />}>
            <CirclePicker
              color={tagColor}
              onChangeComplete={handleColorChange}
            />
          </ColorDropdown>
        </Col>
        <Col s={12} m={4}>
          <Button
            className="light-blue lighten-2 hoverable"
            onClick={handleAddTag}
          >
            Add Tag
          </Button>
        </Col>
      </TagForm>
      <TableContainer>
        {loadingTags ? (
          <LoadingOverlay />
        ) : (
          <>
            <Table centered>
              <thead>
                <tr>
                  <th data-field="id">Tag Name</th>
                  <th data-field="name">Tag Color</th>
                  <th data-field="price">Created On</th>
                  <th data-field="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableTags.map((tag: Tag) => {
                  return (
                    <tr key={tag._id}>
                      <td
                        onClick={() => {
                          handleTagClick(tag._id);
                        }}
                      >
                        <NavLink to={`/tags/${tag._id}`}>{tag.tagName}</NavLink>
                      </td>
                      <TableTagColor backgroundColor={tag.tagColor}>
                        <div />
                      </TableTagColor>
                      <td>{tag.createdDate}</td>
                      <td>
                        <TableActions>
                          <Button
                            floating
                            className="red"
                            tooltip="Delete tag"
                            onClick={() => {
                              handleDeleteModalOpen(tag._id);
                            }}
                            icon={<Icon>delete</Icon>}
                          />
                        </TableActions>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <CustomPagination
              activePage={page}
              items={totalPages}
              leftBtn={
                <PageButton
                  className="light-blue lighten-2"
                  onClick={handlePageDown}
                  icon={<Icon>chevron_left</Icon>}
                />
              }
              rightBtn={
                <PageButton
                  className="light-blue lighten-2"
                  onClick={handlePageUp}
                  icon={<Icon>chevron_right</Icon>}
                />
              }
            />
          </>
        )}
      </TableContainer>
      <Modal
        actions={[
          <Button
            flat
            modal="close"
            node="button"
            waves="green"
            onClick={handleDeleteModalClose}
          >
            No
          </Button>,
          <Button
            flat
            modal="close"
            node="button"
            waves="green"
            onClick={() => handleDeleteTag(selectedTagId)}
          >
            Yes
          </Button>,
        ]}
        fixedFooter
        header="Delete Tag"
        open={openDeleteModal}
        options={{
          dismissible: true,
          endingTop: "10%",
          inDuration: 250,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: "4%",
        }}
      >
        Are you sure you want to delete {selectedTag && selectedTag.tagName}?
      </Modal>
    </NavigationLayout>
  );
};

export default TagDashboardPage;
