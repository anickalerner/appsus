// //import BookApp from 'BookApp.jsx'

// export default class Books extends React.Component {

//     state = {
//         //isFrontImgVisible: false
//     }

//     // componentDidMount() {
//     //     this.setState({ isFrontImgVisible: true })
//     // }

//     render() {
//         return (
//             <section className="books-container">
//                 <h2>Books</h2>
//             </section>
//         )
//     }
// }

import { bookService } from './service/book-service.js'
import { BooksFilter } from './cmps/BooksFilter.jsx'
import { BooksList } from './cmps/BooksList.jsx'

export class Books extends React.Component {

    state = {
        books: null,
        filterBy: { price: null, name: '' },
        selectedBook: null
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks(filter = { price: null, name: null }) {
        bookService.query(filter)
            .then(books => this.setState({ books }));
    }

    onSelectBook = (id) => {
        const newState = { ...this.state };
        newState.selectedBook = newState.books.find(book => book.id === id);
        this.setState(newState);
    }

    onSetFilter = (ev) => {
        const { filterBy } = this.state;
        filterBy[ev.target.name] = ev.target.value;
        this.loadBooks(filterBy)
    }

    onUnSelectBook = () => {
        this.setState({ selectedBook: null });
    }


    render() {
        const {books, filterBy, selectedBook} = this.state;
        if(!books) return <div>Loading...</div>
        return (
            <div className="books-container">
                <BooksFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                <BooksList books={books} onSelectBook={this.onSelectBook} />
            </div>
        )
    }
}