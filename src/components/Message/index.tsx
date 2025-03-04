import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

type MessageProps = {
  message: string;
  title?: string;
  variant?: 'filled' | 'standard' | 'outlined';
  severity?: 'success' | 'error' | 'warning' | 'info';
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function Message(props: MessageProps) {
  const {
    message,
    variant = 'filled',
    title = 'Настройки сохранены',
    severity = 'success',
    open,
    setOpen,
  } = props;

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant={variant}
          sx={{ width: '100%' }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
