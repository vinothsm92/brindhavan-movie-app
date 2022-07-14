import React, { memo, useState } from "react";
import ReactToPrint from "react-to-print";
const { useImperativeHandle } = React;
var op = [];
let date = ""
const ModalContent = React.forwardRef(({ ticketDetails, bookingHistory, movie, print }, ref) => {
    
    date = typeof bookingHistory.movieDate == 'string' ? bookingHistory.movieDate.split('T')[0].split("-").reverse().join("-") : bookingHistory.movieDate.getDate() + '/' + bookingHistory.movieDate.getMonth() + '/' + bookingHistory.movieDate.getFullYear()
    op = movie.filter((e, i, arr) => {

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
        },
        print() {
            window.print();
        }
    }));
    const ticketPrice = invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice;
    const gst = (invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice) * invoiceSummary.gstRate / 100;
    const boookingCharge = invoiceSummary.totalSeatCount * invoiceSummary.serviceCharge;
    const total = ticketPrice + gst + boookingCharge;
    return (<>

        <div className="card">
            {summaryFinalOk || print ? <>
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                <h3 className="text-center">Your Ticket has been Confirmed</h3>
                <Example invoiceSummary={invoiceSummary} bookingHistory={bookingHistory} ticketDetails={ticketDetails}></Example>
            </>
                :
                <div>
                    <div className="card-header bg-black"></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="row">
                                <div className="col-xl-12">
                                    <i className="far fa-building text-danger fa-6x float-start"></i>
                                    <ul className="list-unstyled float-end">
                                        <span className="invoice-li">MOVIE :{op[0].movieName.toUpperCase()} </span>
                                        <br></br>
                                        <li >DATE : {date}</li>
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
                                            <td>{invoiceSummary.totalSeatCount} x {invoiceSummary.ticketPrice} =  {ticketPrice}<i class="fa-solid fa-indian-rupee-sign"></i></td>
                                        </tr>
                                        <tr>
                                            <td>Gst</td>
                                            <td>{invoiceSummary.gstRate} % ={gst}<i class="fa-solid fa-indian-rupee-sign"></i></td>
                                        </tr>
                                        <tr>
                                            <td>Booking Charge</td>
                                            <td>{invoiceSummary.totalSeatCount} x{invoiceSummary.serviceCharge}={boookingCharge}<i class="fa-solid fa-indian-rupee-sign"></i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-xl-8 invoice-li-div" >
                                    <p className="float-end invoice-p" >
                                        Total:
                                        <span><i class="fa-solid fa-indian-rupee-sign"></i>{total}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-black"></div>
                </div>
            }
        </div>
    </>);
})

export default memo(ModalContent);


class ComponentToPrint extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }


    render() {
        const { bookingHistory, ticketDetails } = this.props;
        console.log(bookingHistory)
        const invoiceSummary = this.props.invoiceSummary;

        const ticketPrice = invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice;
        const gst = (invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice) * invoiceSummary.gstRate / 100;
        const boookingCharge = invoiceSummary.totalSeatCount * invoiceSummary.serviceCharge;
        const total = ticketPrice + gst + boookingCharge;
        return (<div id="section-to-print">

            <h3 className="text-center">BRINDHAVAN THEATRE</h3>
            <div className="col-md-12 row" style={{ display: "flex" }}>
                <div className="col-md-9"> <h6 >DATE : {date}</h6>
                </div>
                <div className="col-md-3 float-right"> <h6 >MOVIE :{op[0].movieName.toUpperCase()} </h6></div>
            </div>

            <div className="col-md-12 row" style={{ display: "flex" }}>
                <div className="col-md-9"> <h6>TIME: {bookingHistory.movieTiming}</h6>
                </div>
                <div className="col-md-3 float-right"> <p className="word-wrap">Seats : {ticketDetails}</p>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", }}>

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
                            <td>{invoiceSummary.totalSeatCount} x {invoiceSummary.ticketPrice} =  {ticketPrice}<i class="fa-solid fa-indian-rupee-sign"></i></td>
                        </tr>
                        <tr>
                            <td>Gst</td>
                            <td>{invoiceSummary.gstRate} % ={gst}<i class="fa-solid fa-indian-rupee-sign"></i></td>
                        </tr>
                        <tr>
                            <td>Booking Charge</td>
                            <td>{invoiceSummary.totalSeatCount} x{invoiceSummary.serviceCharge}={boookingCharge}<i class="fa-solid fa-indian-rupee-sign"></i></td>
                        </tr>
                        <tr>
                            <td> Total:</td>
                            <td>{total} <i class="fa-solid fa-indian-rupee-sign"></i></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
        );
    }
}

class Example extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props;
        return (
            <div>

                <ComponentToPrint ref={el => (this.componentRef = el)} ticketDetails={props.ticketDetails} invoiceSummary={props.invoiceSummary} bookingHistory={props.bookingHistory} />
                <ReactToPrint
                    trigger={() => <button type="button" class="btn btn-danger confirmbooking" autoFocus>
                        Print
                    </button>}
                    content={() => this.componentRef}
                />
            </div>
        );
    }
}
