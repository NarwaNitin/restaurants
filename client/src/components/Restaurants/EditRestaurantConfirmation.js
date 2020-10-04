import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteRestaurantConfirmation(props) {
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={props.handleCloseConfirmationDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Restaurant"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to Edit the selected restaurant?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleCloseConfirmationDialog} color="primary" autoFocus>
                CANCEL
            </Button>
            <Button onClick={props.delete} color="primary" autoFocus>
                OK
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
