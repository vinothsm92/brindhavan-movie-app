import MovieSelection from "../ticketBooking/movieSelection";
import React, { useState, useCallback, useEffect } from 'react';
import message from '../../utils/messages';
import SnackbarNotification from '../../utils/snackbar';
import api from '../../utils/api';
import axios from "../../utils/axiosInterceptor";
import CustomizedTables from "../../utils/tables";
import TableBody from "./tableBody";
import "./index.css" ;
function BookingHistory() {
    const [movie, setmovie] = React.useState([]);
    const [showpage, setshowpage] = useState(false)
    const [tableResponse, settableResponse] = useState([])
    const tableHeader = [{
        "title": "Movie Name",
        "align": "left"
    }, {
        "title": "Date", "align": "right"
    }, {
        "title": "ShowTime", "align": "right"
    }, {
        "title": "Seats", "align": "right"
    },
    { "title": "View", "align": "right" }]
    const [historyRequest, sethistoryRequest] = useState({
        "filterValue": "",
        "pageNo": 0,
        "sortTitle": "_id",
        "sortBy": -1,
        "perPage": 10,
        "movieId": "",
        "movieTiming": "",
        "fromDate": new Date(),
        "toDate": ""

    })
    const [state, setState] = useState({
        "filterValue": "",
        "pageNo": 0,
        "sortTitle": "_id",
        "sortBy": -1,
        "perPage": 2,
    });


    useEffect(() => {


        axios.post(api.getMovies, state).then(response => {
            setmovie(response.data.user[0].data)
        })
            .catch(error => {


            });
    }, [])

    const [notification, setnotification] = React.useState({
        open: false,
        notificationMessage: "",
        errorStatus: "",
        ticketDetails: ""
    })
    const { open, notificationMessage, errorStatus } = notification;
    const disableNotification = () => {
        setTimeout(() => {
            setnotification({ ...notification, open: false })
        }, 5000);
    }

    const childToParent = useCallback((e, stateName) => {
        setshowpage(false)

        sethistoryRequest({ ...historyRequest, [stateName]: e })
    }, [historyRequest])
    const getBookingHistory = () => {
        debugger
        setnotification({ ...notification, open: false })
        if (historyRequest.movieId === "") {
            setnotification({ ...notification, open: true, notificationMessage: message.selectMovie, errorStatus: "warning" });
            disableNotification()
            return
        }

        if (historyRequest.movieTiming === "") {
            setnotification({ ...notification, open: true, notificationMessage: message.selectTiming, errorStatus: "warning" });
            disableNotification()
            return
        } else {
            setshowpage(true)
            // alert(JSON.stringify(historyRequest))

            axios.post(api.getBookingHistory, historyRequest).then(response => {debugger
                setshowpage(true);

                settableResponse([]);
                if (response.data.user.length !== 0) {
                    
                    settableResponse(response.data.user[0].data);

                }
            })
                .catch(error => {

                })
        }
    }
    return (<div className="container screen-design">
        <div className="booking-movie-container">
            <MovieSelection childState={childToParent} movieId={""} movie={movie} getBooking={getBookingHistory}></MovieSelection>
        </div>
        {showpage ? <>   <CustomizedTables tableHeader={tableHeader}>
        {tableResponse.length==0 ? <h1>No records found</h1> :  <TableBody tableResponse={tableResponse} />}
        </CustomizedTables></> : null}

        <SnackbarNotification open={open} notificationMessage={notificationMessage} errorStatus={errorStatus} />
    </div>);
}

export default BookingHistory;