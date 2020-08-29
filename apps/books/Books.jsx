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
import { BooksFilter } from './cmps/BooksFilter.jsx';
import { BooksList } from './cmps/BooksList.jsx';
import eventBus from '../../service/event-bus-service.js';

export class Books extends React.Component {

    state = {
        books: null,
        filterBy: { price: null, name: '' },
        selectedBook: null
    }

    componentDidMount() {
        eventBus.emit('change-app', false);
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
        const {books, filterBy} = this.state;
        if(!books) return <div>Loading...</div>
        return (
            <div className="books-container">
                <BooksFilter filterBy={filterBy} onSetFilter={this.onSetFilter} />
                <BooksList books={books} onSelectBook={this.onSelectBook} />
            </div>
        )
    }
}