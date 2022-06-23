import  {React, useEffect,useState} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import api from '../../utils/api';
import axios from "../../utils/axiosInterceptor";
import CircularIndeterminate from '../../utils/loader';
import { Link, useParams } from 'react-router-dom';
const NowShowing=()=> {
  const { movieId } = useParams();
  const [state, setState] = useState({
    "filterValue":"",
    "pageNo":0,
    "sortTitle":"_id",
    "sortBy":-1,
    "perPage":2
   });
   const [data,setData]=useState([]);
   const[loading,setLoading]=useState(false);


  useEffect(()=>{
    setLoading(true);debugger
    axios.post(api.getMovies, state).then(response => {
      setData(response.data.user[0].data)
      setLoading(false)
  })
  .catch(error => {
    setLoading(false) 
    
  });
  },[])
  return (<div >
    <div className="nowShowingImage"> <h1>NowShowing</h1></div>
    <div className="nowShowingImage">
     {loading? <CircularIndeterminate></CircularIndeterminate>:  
   
      <ImageList sx={{ width: 500, height: 450 }}>
        {data.map((item) => (
          <ImageListItem key={item.movieImage}>
            <img
              src={`${item.movieImage}?w=248&fit=crop&auto=format`}
              srcSet={`${item.movieImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.movieName}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.movieName}
              subtitle={item.ticketPrice}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.movieName}`}
                ><Link to={`/ticketbooking/${item._id}`}>
                  <button type="button" class="btn btn-danger" >Book</button></Link>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>}
    </div>
  </div>
  );
}

export default NowShowing;