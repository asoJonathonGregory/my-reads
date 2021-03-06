import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		updateShelf: PropTypes.func.isRequired
	}

	state = {
		preview: false
	}

	handleChange = (event) => {
		this.props.updateShelf(this.props.book, event.target.value)
	}

	handleClick = (event) => {
		this.setState({
			preview: true
		})
	}

	render() {
		let { imageLinks, title, author, id } = this.props.book
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" onClick={this.handleClick} style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks ? imageLinks.smallThumbnail : ""})` }}></div>
						<div className="book-shelf-changer">
							<select defaultValue={this.props.book.shelf} onChange={this.handleChange} id={id}>
								<option value={null} disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{title}</div>
					<div className="book-authors">{author}</div>
				</div>
				{this.state.preview && (
					<div>
						<div onClick={() => this.setState({ preview: false })} className="description-overlay"></div>
						<div onClick={() => this.setState({ preview: false })} className="description-container">
							<h2 className="description-heading">{this.props.book.title}</h2>
							<p className="description-content">{this.props.book.description || "There's no summary associated with this book"}</p>
						</div>
					</div>
				)}
			</li>
		)
	}
}

export default Book