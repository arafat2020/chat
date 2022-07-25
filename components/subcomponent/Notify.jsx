import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useContext } from 'react';
import { UserContext } from '../../state/stateprovider';
import PanToolIcon from '@material-ui/icons/PanTool';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import AnnouncementIcon from '@material-ui/icons/Announcement';

export default function Notify({notify,ststus}) {
    const ctx = useContext(UserContext)
  const open = ctx.open

  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
      }
      ctx.setRed(false)
    ctx.setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={notify}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
             {ststus}
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
