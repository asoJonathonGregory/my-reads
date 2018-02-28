import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import BookCase from './BookCase'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
	state = {
		bookShelf: [],
		searchBooks: []
	}

	componentDidMount() {
		BooksAPI.getAll().then(data => {
			this.setState({
				bookShelf: data
			})
		})
	}

	updateBookShelf = (book, newShelf) => {
		BooksAPI.update(book, newShelf).then(data => {
			let oldShelf = book.shelf
			book.shelf = newShelf
			if (newShelf === "none") {
				this.setState({
					bookShelf: this.state.bookShelf.filter(filterBook => filterBook.id !== book.id)
				})
			} else if (oldShelf === "none") {
				this.setState(prevState => ({
					bookShelf: prevState.bookShelf.concat([book])
				}))
			}
			else {
				console.log(this.state)
				this.setState(prevState => {
					let newState = prevState.bookShelf.filter(filterBook => filterBook.id !== book.id).concat([ book ])
					return {
						bookShelf: newState
					}
					 
				})
			}
		})
	}

	determineSearchBookShelf= (book) => {
		return this.state.bookShelf.find(b => b.id === book.id) ? "currentlyReading" : (this.state.bookShelf.find(b => b.id === book.id) ? "wantToRead" : (this.state.bookShelf.find(b => b.id === book.id)) ? "read" : "none")
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
			<div className="app">
				<Route path="/search" render={() => (
					<Search searchBooks={this.state.searchBooks} updateBookShelf={this.updateBookShelf} handleQuery={this.handleQuery} resetSearchState={this.resetSearchState} />
				)} />
				<Route exact path="/" render={() => (
					<BookCase bookShelf={this.state.bookShelf} updateBookShelf={this.updateBookShelf} />
				)} />
			</div>
		)
	}
}

export default BooksApp