var API="http://localhost:8000/api/";
var api={
    register:API+'users/register',
    logIn:API+'users/authenticate',
    addMovie:API+'movies/add',
    getMovies:API+'movies/getMovies',
    getBookingHistory:API+'bookings/getBookingHistory'
}
export default api;
