import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import React, { memo, useEffect } from 'react';
function SnackbarNotification(props) {
    const [notification, setnotification] = React.useState({
        vertical: 'bottom',
        horizontal: 'center',
        open: false,
        errorStatus: "",
        notificationMessage: ""
    });

    useEffect(() => {
        setnotification({ ...notification, open: props.open, errorStatus: props.errorStatus, notificationMessage: props.notificationMessage });
        setTimeout(() => {
            handleClose();
        }, 5000);
    }, [props]);

    const { vertical, horizontal, open, errorStatus, notificationMessage } = notification;
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = () => {
        setnotification({ ...notification, open: false });
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