# Jonathon's MyReads Project

Using React's create-react-app and the scaffold provided by Udacity, this is a project that was built for Udacity's NanoDegree program

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. Added proptypes and sortby libraries. 
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css 
    ├── App.js
    ├── App.test.js
    ├── Book.js
    ├── BookCase.js
    ├── BooksAPI.js
    ├── BookShelf.js
    ├── icons
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── Search.js
    └── ShelfControl.js
```

## How To Use

In this project, you can choose from a list of prechosen books maintained on Udacity's server to add to your bookshelf.

The books can be on one of the following bookshelves
* Currently Reading
* Want to Read
* Read

And to remove a book from the shelf, select none.

## Helpful Tips

For a list of search terms to allow you to find the books in the database, use the list provided in _SEARCH_TERMS.md_. 

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)

## Extra Packages Used

In addition to Create React App, two other node packages were installed
* [PropTypes](https://www.npmjs.com/package/prop-types)
* [SortBy](https://www.npmjs.com/package/sort-by)