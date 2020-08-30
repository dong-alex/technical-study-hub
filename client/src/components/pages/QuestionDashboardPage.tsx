import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import NavigationLayout from "../layout/NavigationLayout";
import QuestionForm from "../utils/QuestionForm";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { Chip } from "@material-ui/core";
import { QuestionDashboardPageProps } from "../../types";
import { useDataProvider } from "../../hooks/DataProvider";
import DeleteModal from "../utils/DeleteModal";
import CustomTable from "../utils/CustomTable";
import { Tag } from "../../types";

type ColorPreviewProps = {
  backgroundcolor: string;
};

const CustomChip = styled.span`
  background-color: blue;
  color: white;
  padding: 0.5rem;
  border-radius: 2rem;
  user-select: none;
  background: ${(props: ColorPreviewProps) => props.backgroundcolor};
`;

const QuestionDashboardPage: FunctionComponent<QuestionDashboardPageProps> = ({
  history: {
    location: { state },
  },
}: QuestionDashboardPageProps) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  // TODO: more proper validation with errors
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { questions, deleteQuestion } = useDataProvider();
  const [selectedId, setSelectedId] = useState<string>("");

  const resetModal = () => {
    setSelectedId("");
    setOpenDeleteModal(false);
  };

  const handleDeleteModalOpen = (id: string) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedId("");
    setOpenDeleteModal(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Question Name",
        accessor: "name",
        Cell: ({ value, row }: any) => {
          return (
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/questions/${row.original._id}`}
            >
              {value}
            </NavLink>
          );
        },
      },
      {
        Header: "URL",
        accessor: "url",
        Cell: ({ value }: any) => {
          return (
            <a target="_blank" href={value} style={{ textDecoration: "none" }}>
              {value}
            </a>
          );
        },
      },
      {
        Header: "Difficulty",
        accessor: "difficulty",
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ value }: any) => {
          return value.length !== 0 ? (
            <>
              <CustomChip backgroundcolor={value[0].tagColor}>
                {value[0].tagName}
              </CustomChip>
              {value.length - 1 !== 0 && (
                <CustomChip backgroundcolor="#AAA">{`+${
                  value.length - 1
                }`}</CustomChip>
              )}
            </>
          ) : (
            <span>0</span>
          );
        },
      },
      {
        Header: "Notes",
        accessor: "notes",
        Cell: ({ value }: any) => <span>{value.length}</span>,
      },
      {
        id: "button",
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value }: any) => (
          <IconButton
            color="primary"
            onClick={() => {
              handleDeleteModalOpen(value);
            }}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (state && state.updateSuccess) {
      setOpenSnackbar(true);
    }
  }, []);

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <NavigationLayout>
      <h1>Question Dashboard</h1>
      <h2>Create New Questions</h2>
      <QuestionForm isUpdate={false} />
      {questions.length && (
        <CustomTable
          isTag={false}
          columns={columns}
          data={questions}
          onDelete={deleteQuestion}
        />
      )}
      <DeleteModal
        open={openDeleteModal}
        onDelete={async () => {
          try {
            await deleteQuestion(selectedId);
          } catch (err) {
            console.log(err);
          } finally {
            resetModal();
          }
        }}
        onModalClose={handleDeleteModalClose}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Question updated"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </NavigationLayout>
  );
};

export default QuestionDashboardPage;
