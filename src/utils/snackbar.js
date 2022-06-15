import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import React, { memo } from 'react';
function SnackbarNotification({ open, errorStatus, notificationMessage, hideSnackbar }) {
    const [notification, setnotification] = React.useState({
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, } = notification;
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = () => {
        hideSnackbar()
    };
    return (<>

        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                key={vertical + horizontal}>
                <Alert onClose={handleClose} severity={errorStatus} sx={{ width: '100%' }}>
                    {notificationMessage}
                </Alert>
            </Snackbar>
        </Stack></>);
}

export default memo(SnackbarNotification);