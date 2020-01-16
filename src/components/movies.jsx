import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './commons/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './commons/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize:4,
        currentPage:1,
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{name:'All Genres'},...getGenres()];
        this.setState({movies: getMovies(), genres, selectedGenre:genres[0]});
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
        this.setState({ selectedGenre: genre, currentPage: 1 });
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    render() { 
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies:allMovies, genres, selectedGenre, sortColumn } = this.state;

        if(count === 0) return <p>There are no movies in the database.</p>;

        const filtered = selectedGenre && selectedGenre._id
        ? allMovies.filter(m=> m.genre._id === selectedGenre._id) 
        : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return ( 
                <div className="row">
                    <div className="col-2">
                        <ListGroup 
                            items={genres}
                            onItemSelect={this.handleGenreSelect}
                            selectedItem={this.state.selectedGenre}
                        />
                    </div>
                    <div className="col">
                        <p>Showing {filtered.length} movies in the database</p>
                        <MoviesTable 
                            movies={movies}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onLike={this.handleLike}
                            onSort={this.handleSort}
                        />
                        <Pagination 
                            moviesCount={filtered.length} 
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