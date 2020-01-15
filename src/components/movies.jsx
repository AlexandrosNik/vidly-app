import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './commons/like';
import Pagination from './commons/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './commons/listGroup';
import { getGenres } from '../services/fakeGenreService';


class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize:4,
        currentPage:1
    };

    componentDidMount() {
        this.setState({movies: getMovies(), genres: getGenres()});
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    handleGenreSelect = genre => {
        console.log(genre);
    }

    render() { 
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies:allMovies, genres } = this.state;

        if(count === 0) return <p>There are no movies in the database.</p>;

        const movies = paginate(allMovies, currentPage, pageSize);

        return ( 
                <div className="row">
                    <div className="col-2">
                        <ListGroup 
                            items={genres}
                            onItemSelect={this.handleGenreSelect}
                            textProperty='name'
                            valueProperty='_id'
                        />
                    </div>
                    <div className="col">
                        <p>Showing {count} movies in the database</p>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Stock</th>
                                    <th>Rate</th>
                                    <th/>
                                    <th/>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map(movie => (
                                    <tr key={movie._id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre.name}</td>
                                        <td>{movie.numberInStock}</td>
                                        <td>{movie.dailyRentalRate}</td>
                                        <td>
                                            <Like onClick= {() => this.handleLike(movie)} liked={movie.liked}/>
                                        </td>
                                        <td>
                                            <button 
                                            className ='btn btn-danger btn-sm' 
                                            onClick = {() => this.handleDelete(movie)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>  
                                ))}
                            </tbody>
                        </table>
                        <Pagination 
                        moviesCount={count} 
                        pageSize={pageSize} 
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                        />
                    </div>
                </div>
        ); 
    };
}
 
export default Movies;