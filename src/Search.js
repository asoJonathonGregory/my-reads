import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class Search extends Component {
	static propTypes = {
		bookShelf: PropTypes.array.isRequired,
		updateBookShelf: PropTypes.func.isRequired
	}

	state = {
		value: "",
		searchBooks: []
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		})
		this.handleQuery(e.target.value)
	}

	determineSearchBookShelf = (book) => {
		let isBookInShelf = this.props.bookShelf.find(b => b.id === book.id)
		return isBookInShelf ? isBookInShelf.shelf : "none"
	}

	addShelfAndUpdateState = (books) => {
		if (books && !books.error) {
			books.forEach(book => {
				book.shelf = this.determineSearchBookShelf(book)
			})
			this.setState({ searchBooks: books.sort(sortBy("title")) })

		}
		else {
			this.resetSearchState()
		}
	}

	resetSearchState = () => {
		this.setState({ searchBooks: [] })
	}

	handleQuery = (query) => {
		query ? BooksAPI.search(query).then(data => data ? this.addShelfAndUpdateState(data) : this.resetSearchState()) : this.resetSearchState()
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
						{this.state.searchBooks.map(book => (
							<Book key={book.id} updateShelf={this.props.updateBookShelf} book={book} />
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search