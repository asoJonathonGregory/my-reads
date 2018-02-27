import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import BookCase from './BookCase'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
	state = {
		currentlyReading: [],
		wantToRead: [],
		read: [],
		searchBooks: []
	}

	componentDidMount() {
		BooksAPI.getAll().then(data => {
			this.setState({
				currentlyReading: data.filter(book => book.shelf === "currentlyReading").sort(sortBy("title")),
				wantToRead: data.filter(book => book.shelf === "wantToRead").sort(sortBy("title")),
				read: data.filter(book => book.shelf === "read").sort(sortBy("title"))
			})
		})
	}

	updateBookShelf = (book, newShelf, oldShelf) => {
		BooksAPI.update(book, newShelf).then(data => {
			/**
			 * Reassigns the shelf attribute on the book 
			 * object and moves it to the correct array in 
			 * the state object.
			 */
			book.shelf = newShelf
			if (newShelf === "none") {
				let oldShelfContents = this.state[oldShelf].filter(filterBook => filterBook.id !== book.id);
				this.setState({
					[oldShelf]: oldShelfContents
				})
			} else if (oldShelf === "none") {
				let newShelfContents = this.state[newShelf].concat([book])
				this.setState({
					[newShelf]: newShelfContents.sort(sortBy("title"))
				})
			} else {
				let oldShelfContents = this.state[oldShelf].filter(filterBook => filterBook.id !== book.id),
					newShelfContents = this.state[newShelf].concat([book])
				this.setState({
					[oldShelf]: oldShelfContents,
					[newShelf]: newShelfContents.sort(sortBy("title"))
				})
			}
		})
	}

	determineSearchBookShelf= (book) => {
		return this.state.currentlyReading.find(b => b.id === book.id) ? "currentlyReading" : (this.state.wantToRead.find(b => b.id === book.id) ? "wantToRead" : (this.state.read.find(b => b.id === book.id)) ? "read" : "none")
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
					<Search books={this.state} updateBookShelf={this.updateBookShelf} handleQuery={this.handleQuery} resetSearchState={this.resetSearchState} />
				)} />
				<Route exact path="/" render={() => (
					<BookCase books={this.state} updateBookShelf={this.updateBookShelf} />
				)} />
			</div>
		)
	}
}

export default BooksApp