import React, { Component } from 'react';
import Like from './commons/like';
import TableHeader from './commons/tableHeader';
import TableBody from './commons/tableBody';

class MoviesTable extends Component {
    columns = [
        {path:'title', label:'Title'},
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
            <table className='table'>
               <TableHeader 
                    columns={this.columns} 
                    sortColumn={sortColumn} 
                    onSort={onSort}
               />
               <TableBody 
                    data={movies} 
                    columns={this.columns}
               />
            </table>
        )
    }
}
 
export default MoviesTable;
