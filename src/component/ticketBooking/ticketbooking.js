import './ticketbooking.css';
import seatings from '../../utils/seatings';
import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import MovieSelection from './movieSelection';
import SnackbarNotification from '../../utils/snackbar';
import message from '../../utils/messages';
import TicketConfirmationModal from '../../utils/modal';
import ModalContent from './modalContent';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import axios from "../../utils/axiosInterceptor";

function TicketBooking({ }) {

    const row = seatings.row;
    const seating = seatings.seatSize
    const lastSeat = seatings.lastSeat;
    const childRef = useRef();
    let { movieId } = useParams();
    console.log(movieId);
    const [bookingHistory, setbookingHistory] = useState({
        seatSeletion: [],
        movieId: movieId,
        fromDate: new Date(),
        movieTiming: "",
        "createdBy": localStorage.getItem("user_id"),
        "updatedBy": localStorage.getItem("user_id")
    });
    const [notification, setnotification] = React.useState({
        open: false,
        notificationMessage: "",
        errorStatus: "",
        ticketDetails: ""
    })
    const { open, notificationMessage, errorStatus } = notification;
    const [state, setState] = useState({
        "filterValue": "",
        "pageNo": 0,
        "sortTitle": "_id",
        "sortBy": -1,
        "perPage": 2,
    });
    const [movie, setmovie] = React.useState([]);

    useEffect(() => {
        console.log(bookingHistory);
    }, [bookingHistory]);

    useEffect(() => {
        debugger

        axios.post(api.getMovies, state).then(response => {
            setmovie(response.data.user[0].data)
        })
            .catch(error => {


            });
    }, [])
    const getBookingHistory = () => {
        if (bookingHistory.movieTiming === "") {
            setnotification({ ...notification, open: true, notificationMessage: message.selectTiming, errorStatus: "warning" });
            disableNotification()
            return
        } else {
            axios.post(api.getBookingHistory, bookingHistory).then(response => {debugger
              if(response.data.user.length!==0){
                alert("hi")
              }

            })
                .catch(error => {

                })
        }
    }
    //child to parent props
    const childToParent = useCallback((e, stateName) => {
        setbookingHistory({ ...bookingHistory, [stateName]: e });
    }, [bookingHistory])


    const disableNotification = () => {
        setTimeout(() => {
            setnotification({ ...notification, open: false })
        }, 5000);
    }
    const seatClick = (rowIndex, columnIndex, seatingIndex) => {
        debugger
        // if (bookingHistory.movieId === "") {
        //     setnotification({ ...notification, open: true, notificationMessage: message.selectMovie, errorStatus: "warning" });
        //     disableNotification()
        //     return
        // }
        if (bookingHistory.movieTiming === "") {
            setnotification({ ...notification, open: true, notificationMessage: message.selectTiming, errorStatus: "warning" });
            disableNotification()
            return
        }
        else {
            //check seat is existing or not
            var isExisting = bookingHistory.seatSeletion.filter((e, i, a) => {
                return e.rowNo === rowIndex && e.columnNo === columnIndex && e.seatNo === seatingIndex
            })

            if (isExisting.length > 0) {
                debugger
                var a = bookingHistory.seatSeletion.filter((e, i, a) => {

                    if (e.rowNo !== rowIndex || e.columnNo !== columnIndex || e.seatNo !== seatingIndex) {
                        return true
                    } else {
                        return false
                    }
                })
                setbookingHistory({ ...bookingHistory, seatSeletion: a })
            } else {
                setbookingHistory({ ...bookingHistory, seatSeletion: bookingHistory.seatSeletion.concat({ rowNo: rowIndex, columnNo: columnIndex, seatNo: seatingIndex }) })
            }
        }
    }
    var seleted = "";
    const bookingConfirm = () => {
        seleted = " ";
        bookingHistory.seatSeletion.map((e, index) => {
            let prevSeatCount = e.seatNo + 1;
            if (e.columnNo > 0) {
                for (let i = 0; i < e.columnNo; i++) {
                    prevSeatCount += seatings.seatSize[i];
                }
            }

            seleted += index === 0 ? seatings.alphabet[e.rowNo] + prevSeatCount : "," + seatings.alphabet[e.rowNo] + prevSeatCount;
        });
        var split = seleted.split(',')
        var sort = split.sort((a, b) => {
            let x = a.toLowerCase();
            let y = b.toLowerCase();
            if (x > y) {
                return 1;
            } else if (y > x) {
                return -1;
            } return 0
        })

        var ticketDetails = sort.join(',')

        childRef.current.handleClickOpen()
        setnotification({ ...Notification, ticketDetails: ticketDetails });


    }
    return (
        <div className="container screen-design">
            <div className="booking-movie-container">
                <MovieSelection childState={childToParent} movieId={movieId} movie={movie} getBooking={getBookingHistory}></MovieSelection>
            </div>
            <ul className="booking-showcase">
                <li>
                    <div className="booking-seat"></div>
                    <small>N/A</small>
                </li>
                <li>
                    <div className="booking-seat booking-selected"></div>
                    <small>booking-selected</small>
                </li>
                <li>
                    <div className="booking-seat booking-occupied"></div>
                    <small>booking-occupied</small>
                </li>
            </ul>
            <div className="booking-container">
                <div className="booking-screen"></div>
                {Array.from({ length: row }, (rowElement, rowIndex) => <div className='booking-row'>
                    {seatings.alphabet[rowIndex]}
                    {Array.from({ length: seating.length }, (columnElement, columnIndex) => {
                        return <div className='walking-space'>
                            <div className='booking-row'>
                                {Array.from({ length: seating[columnIndex] }, (seatingElement, seatingIndex) => {
                                    return <div className={bookingHistory.seatSeletion.filter((e, i, a) => e.rowNo === rowIndex && e.columnNo === columnIndex && e.seatNo === seatingIndex).length === 0 ? "booking-seat" : "booking-seat booking-selected"}
                                        key={seatingIndex} onClick={() => { seatClick(rowIndex, columnIndex, seatingIndex) }} ></div>
                                })}
                            </div>
                        </div>
                    })}
                </div>)}
                <div className='booking-row'>
                    {Array.from({ length: lastSeat }, (columnelement, columnIndex) => {
                        return <div className="booking-seat"></div>
                    })}
                </div>
                <TicketConfirmationModal ref={childRef} title="Booking confirmation">
                    <ModalContent ticketDetails={notification.ticketDetails} bookingHistory={bookingHistory} movie={movie}></ModalContent>
                </TicketConfirmationModal>
                <button type="button" class="btn btn-danger confirmbooking" disabled={
                    bookingHistory.seatSeletion.length === 0
                } onClick={bookingConfirm}>Confirm Booking</button>
            </div>
            <p className="text">
                You have selected <span className="count">{bookingHistory.seatSeletion.length}</span> seats
            </p>
            <SnackbarNotification open={open} notificationMessage={notificationMessage} errorStatus={errorStatus} />
        </div>)
}
export default memo(TicketBooking);

