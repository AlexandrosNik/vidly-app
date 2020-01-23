import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './commons/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './commons/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Search from './commons/search';



class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize:4,
        currentPage:1,
        searchQuery:'',
        selectedGenre: null,
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
        this.setState({ selectedGenre: genre, currentPage: 1, searchQuery:'' });
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    handleSearchChange = query => {
        this.setState({ searchQuery: query ,currentPage: 1, selectedGenre: null });
    }

    getPageData = () => {
        const { pageSize, currentPage, movies:allMovies,  selectedGenre, sortColumn, searchQuery } = this.state;

        let filtered = allMovies;

        if(searchQuery){
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        }
        else if(selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(m=> m.genre._id === selectedGenre._id);
        }
        

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies}
    }

    render() { 
        const { length: count } = this.state.movies;
        const { pageSize, currentPage,  genres,  sortColumn, searchQuery } = this.state;

        if(count === 0) return <p>There are no movies in the database.</p>;

        const {totalCount, data} =this.getPageData();

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
                        <Link to='/movies/new'>
                            <button className="btn btn-primary mb-2">New Movie</button>
                        </Link>
                        <p>Showing {totalCount} movies in the database</p>
                        <Search onChange={this.handleSearchChange} value={searchQuery}/>
                        <MoviesTable 
                            movies={data}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onLike={this.handleLike}
                            onSort={this.handleSort}
                        />
                        <Pagination 
                            moviesCount={totalCount} 
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