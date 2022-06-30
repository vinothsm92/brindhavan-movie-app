import React, { memo, useState } from "react";
import ReactToPrint from "react-to-print";
const { useImperativeHandle } = React;
var op = []
const ModalContent = React.forwardRef(({ ticketDetails, bookingHistory, movie }, ref) => {

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
    const ticketPrice= invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice;
        const gst=(invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice) * invoiceSummary.gstRate / 100;
        const boookingCharge=invoiceSummary.totalSeatCount * invoiceSummary.serviceCharge;
        const total=ticketPrice+gst+boookingCharge;
    return (<>

        <div className="card">
            {summaryFinalOk ? <>
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
<<<<<<< HEAD
                <h3 className="text-center">Your Ticket has been Confirmed</h3>
                <Example invoiceSummary={invoiceSummary} bookingHistory={bookingHistory} ticketDetails={ticketDetails}></Example>
            </>
                :
                <div>
=======

                <Example invoiceSummary={invoiceSummary} bookingHistory={bookingHistory} ticketDetails={ticketDetails}></Example>
            </>
                :

                <div>

>>>>>>> cca24236bfd1cb5d0ee13b33b7b74939385b612c
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
<<<<<<< HEAD
=======


>>>>>>> cca24236bfd1cb5d0ee13b33b7b74939385b612c
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
<<<<<<< HEAD
        
=======
        debugger
>>>>>>> cca24236bfd1cb5d0ee13b33b7b74939385b612c
        const ticketPrice= invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice;
        const gst=(invoiceSummary.totalSeatCount * invoiceSummary.ticketPrice) * invoiceSummary.gstRate / 100;
        const boookingCharge=invoiceSummary.totalSeatCount * invoiceSummary.serviceCharge;
        const total=ticketPrice+gst+boookingCharge;
        return (<div id="section-to-print">
<<<<<<< HEAD
           
=======
            <h3 className="text-center">your Ticket has been Confirmed</h3>
>>>>>>> cca24236bfd1cb5d0ee13b33b7b74939385b612c
            <h3 className="text-center">BRINDHAVAN THEATRE</h3>
            <h6 className="text-center">MOVIE :{op[0].movieName.toUpperCase()} </h6>
            <div className="center-content">
            <p className="word-wrap">Seats : {ticketDetails}</p>
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
<<<<<<< HEAD
}
=======
}
>>>>>>> cca24236bfd1cb5d0ee13b33b7b74939385b612c
