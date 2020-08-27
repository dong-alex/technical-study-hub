import React, { FunctionComponent, useState, useEffect } from "react";
import { StaticContext } from "react-router";
import NavigationLayout from "../layout/NavigationLayout";
// import TableDashboard from "../utils/TableDashboard";
import QuestionForm from "../utils/QuestionForm";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { QuestionDashboardPageProps } from "../../types";

const QuestionDashboardPage: FunctionComponent<QuestionDashboardPageProps> = ({
  history: {
    location: { state },
  },
}: QuestionDashboardPageProps) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  // TODO: more proper validation with errors

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
      <h4>Question Dashboard</h4>
      <h6>Create New Questions</h6>
      <QuestionForm isUpdate={false} />
      {/* <TableDashboard isTag={false} /> */}
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
