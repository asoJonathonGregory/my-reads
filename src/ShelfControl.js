import React from 'react'

const ShelfControl = (props) => (
	<select defaultValue={props.shelf} onChange={props.updateShelf}>
		<option value="none" disabled>Move to...</option>
		<option value="currentlyReading">Currently Reading</option>
		<option value="wantToRead">Want to Read</option>
		<option value="read">Read</option>
		<option value="none">None</option>
	</select>
)

export default ShelfControl