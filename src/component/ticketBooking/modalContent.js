import React, { memo, useState } from "react";
const { useImperativeHandle } = React;
const  ModalContent=React.forwardRef(({ ticketDetails, bookingHistory, movie }, ref)=>{

    var op = movie.filter((e, i, arr) => {

        return e._id == bookingHistory.movieId
    })

    const [invoiceSummary, setinvoiceSummary] = useState({
        totalSeatCount: bookingHistory.seatSeletion.length,
        ticketPrice: op[0].ticketPrice,
        gstRate: op[0].gst,
        serviceCharge: op[0].serviceCharge
    })
   
    const [summaryFinalOk, setsummaryFinalOk] = useState(false);
    useImperativeHandle(ref, () => ({
        showTick() {
            setsummaryFinalOk(true);
        }
    }));
    return (<>

        <div className="card">
            {summaryFinalOk ?<>
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                 <h3 className="text-center">your Ticket has been Confirmed</h3></>
                 : <>
                    <div className="card-header bg-black"></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="row">
                                <div className="col-xl-12">
                                    <i className="far fa-building text-danger fa-6x float-start"></i>
                                    <ul className="list-unstyled float-end">
                                        <span className="invoice-li">MOVIE :{op[0].movieName.toUpperCase()} </span>
                                        <br></br>
                                        <li >DATE : {bookingHistory.movieDate.getDate()}/{bookingHistory.movieDate.getMonth()}/{bookingHistory.movieDate.getFullYear()}</li>
                                        <li>TIME: {bookingHistory.movieTiming}</li>
                                        <li>Seats : {ticketDetails}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="row text-center">
                                <h3 className="text-uppercase text-center mt-3 invoice-h3" >Invoice</h3>
                            </div>

                            <div className="row mx-3">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ticket Order Summary </th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Ticket price</td>
                                            <td>{invoiceSummary.totalSeatCount} x {invoiceSummary.ticketPrice} =  {invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice}<i class="fa-solid fa-indian-rupee-sign"></i></td>
                                        </tr>
                                        <tr>
                                            <td>Gst</td>
                                            <td>{invoiceSummary.gstRate} % ={(invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice) * invoiceSummary.gstRate / 100}<i class="fa-solid fa-indian-rupee-sign"></i></td>
                                        </tr>
                                        <tr>
                                            <td>Internet Handling</td>
                                            <td>{invoiceSummary.totalSeatCount} x{invoiceSummary.serviceCharge}={invoiceSummary.totalSeatCount * invoiceSummary.serviceCharge}<i class="fa-solid fa-indian-rupee-sign"></i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-xl-8 invoice-li-div" >
                                    <p className="float-end invoice-p" >
                                        Total:
                                        <span><i class="fa-solid fa-indian-rupee-sign"></i>{bookingHistory.seatSeletion.length * op[0].ticketPrice + bookingHistory.seatSeletion.length * op[0].ticketPrice * op[0].gst / 100 + op[0].serviceCharge}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-black"></div>
                </>}
        </div>

    </>);
})

export default memo(ModalContent);