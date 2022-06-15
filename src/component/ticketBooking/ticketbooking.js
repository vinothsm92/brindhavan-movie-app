import './ticketbooking.css'
function TicketBooking() {
    return (<div className="container screen-design">
        <br></br>
        <div className="booking-movie-container">
            <label>Pick a movie:</label>
            <select>
                <option value="10">Avengers: Endgame ($10)</option>
                <option value="12">Joker ($12)</option>
                <option value="8">Toy Story 4 ($8)</option>
                <option value="9">The Lion King ($9)</option>
            </select>
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

            <div className="booking-row">
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
            </div>
            <div className="booking-row">
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat booking-occupied"></div>
                <div className="booking-seat booking-occupied"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
            </div>
            <div className="booking-row">
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat booking-occupied"></div>
                <div className="booking-seat booking-occupied"></div>
            </div>
            <div className="booking-row">
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
            </div>
            <div className="booking-row">
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat booking-occupied"></div>
                <div className="booking-seat booking-occupied"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
            </div>
            <div className="booking-row">
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat"></div>
                <div className="booking-seat booking-occupied"></div>
                <div className="booking-seat booking-occupied"></div>
                <div className="booking-seat booking-occupied"></div>
                <div className="booking-seat"></div>
            </div>
        </div>

        <p className="text">
            You have booking-selected <span className="count">0</span> booking-seats for a price of $<span
                id="total"
            >0</span
            >
        </p>
    </div>);
}

export default TicketBooking;