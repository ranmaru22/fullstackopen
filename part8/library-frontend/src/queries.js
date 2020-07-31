import { gql } from "@apollo/client";

export const ALL_BOOKS = gql(`
    query allBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            published
            author {
                name
                id
            }
            genres
            id
        }
    }
`);

export const ALL_AUTHORS = gql(`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`);

export const ALL_GENRES = gql(`
    query {
        allGenres
    }
`);

export const GET_USER = gql(`
    query {
        me {
            username
            favoriteGenre
        }
    }
`);

export const ADD_BOOK = gql(`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title
            published
            author {
                name
                id
            }
            genres
            id
        }
    }
`);

export const EDIT_BIRTHYEAR = gql(`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            id
        }
    }
`);

export const LOGIN = gql(`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`);

export const SUB_BOOK_ADDED = gql(`
    subscription {
        bookAdded {
            title
            published
            author {
                name
                id
            }
            genres
            id
        }
    }
`);
