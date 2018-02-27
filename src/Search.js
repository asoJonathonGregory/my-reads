import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {
	state = {
		value: ""
	}

	componentDidMount() {
		this.props.resetSearchState()
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		})
		this.props.handleQuery(e.target.value)
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={this.state.value} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.props.books.searchBooks.map(book => (
							<Book key={book.id} updateShelf={this.props.updateBookShelf} book={book} />
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search