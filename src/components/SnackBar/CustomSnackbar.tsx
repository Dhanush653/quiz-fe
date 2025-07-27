import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface CustomSnackbarProps {
  message: string;
  type: AlertColor; // 'success' | 'error' | 'info' | 'warning'
  open: boolean;
  onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ message, type, open, onClose }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Snackbar
      open={visible}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={type} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;