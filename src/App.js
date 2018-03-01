import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import BookCase from './BookCase'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
	state = {
		bookShelf: []
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

	render() {
		return (
			<div className="app">
				<Route path="/search" render={() => (
					<Search bookShelf={this.state.bookShelf} updateBookShelf={this.updateBookShelf} />
				)} />
				<Route exact path="/" render={() => (
					<BookCase bookShelf={this.state.bookShelf} updateBookShelf={this.updateBookShelf} />
				)} />
			</div>
		)
	}
}

export default BooksApp