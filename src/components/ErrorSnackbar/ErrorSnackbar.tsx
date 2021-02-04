import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {ErrorType} from "../../state/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {

    const error = useSelector<AppRootStateType,ErrorType>((state => state.app.error))
    const [open, setOpen] = React.useState(true)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (error === 'Error') {
            return
        }
        setOpen(false)
    }

    return (
        <Snackbar open={error !==null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Error!
            </Alert>
        </Snackbar>

    )
}
