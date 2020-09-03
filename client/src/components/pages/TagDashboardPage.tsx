import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigationLayout from "../layout/NavigationLayout";
import TagForm from "../utils/TagForm";
import DeleteModal from "../utils/DeleteModal";

import { TagDashboardPageProps } from "../../types";
import { useDataProvider } from "../../hooks/DataProvider";
import CustomTable from "../utils/CustomTable";

type ColorPreviewProps = {
  color: string;
};

const ColorPreview = styled.div`
  height: 2rem;
  width: 2rem;
  margin: 0 2rem 0 2rem;
  border-radius: 2rem;
  background-color: ${(props: ColorPreviewProps) => props.color};
`;

const TagDashboardPage: FunctionComponent<TagDashboardPageProps> = ({
  history: {
    location: { state },
  },
}) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { tags, deleteTag } = useDataProvider();
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
        Header: "Tag Name",
        accessor: "tagName",
        Cell: ({ value, row }: any) => {
          return (
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/tags/${row.original._id}`}
            >
              {value}
            </NavLink>
          );
        },
      },
      {
        Header: "Color",
        accessor: "tagColor",
        // nullify the string output of the color string and just use color
        Cell: ({ value }: any): null => {
          return null;
        },
      },
      {
        Header: "Created On",
        accessor: "createdDate",
      },
      {
        id: "button",
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
      <h1>Tag Dashboard</h1>
      <h2>Create New Tag</h2>
      <TagForm isUpdate={false} />
      {tags && (
        <CustomTable isTag columns={columns} data={tags} onDelete={deleteTag} />
      )}
      <DeleteModal
        open={openDeleteModal}
        onDelete={async () => {
          try {
            await deleteTag(selectedId);
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
        message="Tag updated"
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

export default TagDashboardPage;
