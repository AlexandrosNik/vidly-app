import React, { Component } from 'react';
import Like from './commons/like';
import Table from './commons/table';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
    columns = [
        {path:'title', label:'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path:'genre.name', label:'Genre'},
        {path:'numberInStock', label:'Stock'},
        {path:'dailyRentalRate', label:'Rate'},
        {key: 'like', content: movie => <Like onClick= {() => this.props.onLike(movie)} liked={movie.liked}/>},
        {key: 'delete', 
        content: movie => ( 
            <button 
            className ='btn btn-danger btn-sm' 
            onClick = {() => this.props.onDelete(movie)}
            >
                Delete
            </button>
            ) 
        }
    ];

    render() { 
        const { movies, onSort, sortColumn } = this.props;

        return ( 
            <Table
                columns={this.columns}
                data={movies}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        )
    }
}
 
export default MoviesTable;
