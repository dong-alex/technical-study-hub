import React, { FunctionComponent, useState, useEffect } from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TableDashboard from "../utils/TableDashboard";
import NavigationLayout from "../layout/NavigationLayout";
import TagForm from "../utils/TagForm";

type LocationState = {
  updateSuccess?: boolean;
};

type TagDashboardPageProps = RouteComponentProps<
  {},
  StaticContext,
  LocationState
>;

const TagDashboardPage: FunctionComponent<TagDashboardPageProps> = ({
  history: {
    location: { state },
  },
}) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

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
      <h4>Tag Dashboard</h4>
      <h6>Create New Tag</h6>
      <TagForm isUpdate={false} />
      <TableDashboard isTag />
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
