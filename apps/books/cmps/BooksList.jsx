import {BookPreview} from './BookPreview.jsx'

export function BooksList(props){
    return <ul className="books-list">
        {props.books.map(book => <BookPreview onSelectBook={props.onSelectBook} key={book.id} bookToShow={book}/>)}
    </ul>
}