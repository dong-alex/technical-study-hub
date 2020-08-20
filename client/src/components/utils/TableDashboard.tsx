import React, { useState, useEffect, FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button, Icon, Table, Pagination } from "react-materialize";
import DeleteModal from "./DeleteModal";
import LoadingOverlay from "./LoadingOverlay";
import useTags from "../../hooks/useTags";
import useQuestions from "../../hooks/useQuestions";
import usePagination from "../../hooks/usePagination";
import { Question } from "../../hooks/reducers/questionsReducer";
import { Tag } from "../../hooks/reducers/tagsReducer";

type ColorPreviewProps = {
  backgroundColor: string;
};

interface TableDashboardProps {
  data: Question[] | Tag[];
  loadingState: boolean;
  isTag: boolean;
}

const TableTagColor = styled.td`
  > div {
    background-color: ${(props: ColorPreviewProps) => props.backgroundColor};
    margin: 0 auto 0 auto;
    width: 20px;
    height: 20px;
  }
`;

const TableContainer = styled.div`
  height: 100%;
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

const PageButton = styled(Button)`
  width: 100%;
`;

const isTagType = (item: Tag | Question): item is Tag => {
  return (item as Tag).tagName !== undefined;
};

// specifically only for tags or questions
const TableDashboard: FunctionComponent<TableDashboardProps> = ({
  data,
  isTag,
  loadingState,
}) => {
  const [totalPages, setTotalPages] = useState<number>(1);
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const [tagData, setTagData] = useState<Tag[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const { page, handlePageUp, handlePageDown } = usePagination(totalPages);
  const { deleteTag } = useTags();
  const { deleteQuestion } = useQuestions();

  const itemsPerPage = 10;

  const resetModal = () => {
    setSelectedId("");
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    setTotalPages(1 + data.length / itemsPerPage);

    if (data && data.length > 0) {
      // depending on the page - set the data 10 at a time per page
      const offset = (page - 1) * itemsPerPage;
      const displayData = data.slice(offset, offset + itemsPerPage);

      // break up the union type
      if (isTag) {
        setTagData(displayData as Tag[]);
      } else {
        setQuestionData(displayData as Question[]);
      }
    }
  }, [data, page]);

  const handleDeleteModalOpen = (id: string) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedId("");
    setOpenDeleteModal(false);
  };

  const getTableData = () => {
    if (isTag) {
      return (
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
            {tagData.map((tag: Tag) => {
              return (
                <tr key={tag._id}>
                  <td>
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
      );
    }
    return (
      <Table centered>
        <thead>
          <tr>
            <th data-field="id">Question</th>
            <th data-field="tags-attached">Tags</th>
            <th data-field="created-on">Created On</th>
            <th data-field="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questionData.map((question: Question) => {
            return (
              <tr key={question._id}>
                <td>
                  <NavLink to={`/questions/${question._id}`}>
                    {question.name}
                  </NavLink>
                </td>
                <td>{question.tags.length}</td>
                <td>{question.createdDate}</td>
                <td>
                  <TableActions>
                    <Button
                      floating
                      className="red"
                      tooltip="Delete Question"
                      onClick={() => {
                        handleDeleteModalOpen(question._id);
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
    );
  };

  return (
    <>
      <TableContainer>
        {loadingState ? (
          <LoadingOverlay />
        ) : (
          <>
            {getTableData()}
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
      <DeleteModal
        open={openDeleteModal}
        onDelete={
          isTag
            ? async () => {
                try {
                  await deleteTag(selectedId);
                } catch (err) {
                  console.log(err);
                } finally {
                  resetModal();
                }
              }
            : async () => {
                try {
                  await deleteQuestion(selectedId);
                } catch (err) {
                  console.log(err);
                } finally {
                  resetModal();
                }
              }
        }
        onModalClose={handleDeleteModalClose}
      />
    </>
  );
};

export default TableDashboard;
