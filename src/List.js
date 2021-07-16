import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import TextTruncate from "react-text-truncate";
import defaultImage from "./assets/default.jpg";
import numeral from "numeral";
import "./List.css";
import axios from './axios';
import requests, { imageBase } from './api';
import {toast} from 'react-toastify';

function List({ setMovieId, setLoading }) {
  const [genres, setGenres] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    axios.get(requests.fetchGenres).then((response) => {
      setGenres(response.data.genres);
    }).catch((err) => errorOccurred(err));
    axios.get(requests.fetchPopularMovies).then((response) => {
      setPopularMovies(response.data.results.reverse());
    }).catch((err) => errorOccurred(err));
  }

  fetchData();
}, []);

  const errorOccurred = (error) => {
	setLoading(false);
	toast.error(`Something went wrong: ${error.message}`);
	console.log(error.message);
  }


  const handleClick = (movie) => {
    movie.media_type = 'movie';
    setMovieId(movie);
    setLoading(true);
  }

  const getReleaseYear = (date) => {
    let year = new Date(date);
    return year.getFullYear();
  }

  return (
    <div className="list">

			<div class="list__trending">
				<h4>Top Rated Movies</h4>
				<div class="list__items">
					{ popularMovies?.slice(0, 12).map((movie) => 
						(<div class="list__item" onClick={() => handleClick(movie)}>
							<img loading="lazy" onError={(e) => {e.target.onerror = null; e.target.src = defaultImage }} src={`${imageBase}${movie.backdrop_path || movie.poster_path}`} />
							<div className="list__itemInfo">
								<h5 className="list__itemTitle">{movie.title || movie.original_title}<span className="list__itemYear">({getReleaseYear(movie.release_date || movie.first_air_date)})</span></h5>
								<TextTruncate
									line={2}
									element="p"
									containerClassName="list__itemOverview"
									truncateText="…"
									text={movie.tagline || movie.overview}
								/>
								<div className="list__rating">
									<Rating name="movie-rating" className="movieRating" value={(movie.vote_average / 2) || 0} precision={0.5} icon={<StarRoundedIcon fontSize="inherit" readOnly />}/>
									<small className="list__likes">{numeral(movie.vote_average / 2).format('0.0')}</small>
								</div>
							</div>
						</div>)
					)}
				</div>
			</div>

		

		</div>
  );
}

export default List;