const { withRouter } = ReactRouterDOM;

import { LongText } from '../../../cmps/LongText.jsx'
import { ReviewForm } from './BookDetails/ReviewForm.jsx'
import { bookService } from '../service/book-service.js'

export class BookDetails extends React.Component {

    state = {
        book: null
    }

    getCurrencyIcon(type) {
        switch (type) {
            case 'EUR':
                return '€';
            case 'ILS':
                return '₪';
            case 'USD':
                return '$';
            default:
                break;
        }
    }

    componentDidMount() {
        bookService.getBook(this.props.match.params.id)
            .then(book => {
                this.setState({ book });
            })
    }

    getBookLength(length) {
        if (length > 500) return 'Long reading';
        else if (length > 200) return 'Decent reading';
        else return 'Light reading';
    }

    getBookAge(date) {
        const age = new Date().getFullYear() - date;
        if (age <= 1) return 'New!';
        else if (age >= 10) return 'Veteran Book';
        else return ''
    }

    onLeave = () => {
        this.props.history.goBack()
    }

    render() {
        const book = this.state.book;
        if (!book) return <h1>Loading...</h1>
        const { publishedDate, title, subtitle, thumbnail, authors, pageCount, language, description } = book;
            const { amount, currencyCode } = book.listPrice;
        return (
            <div className="book-details-container">
                <section className="book-details rounded aps-box-shadow-big">
                    <button className="exit-btn" onClick={this.onLeave}>X</button>
                    <h1>{title}</h1>
                    <h3>{subtitle}</h3>
                    <img src={thumbnail} alt="Loading..." />
                    <h3>Authors: {authors}</h3>
                    <h3>Publish Date: {`${publishedDate} ${this.getBookAge(publishedDate)}`}</h3>
                    <h5>Length: {pageCount + ' pages, ' + this.getBookLength(pageCount)}</h5>

                    <h5>Language: {language}</h5>
                    <LongText text={description} />
                    <h2>Price: {amount + ' ' + this.getCurrencyIcon(currencyCode)}</h2>
                </section>
                <ReviewForm bookId={book.id} />
            </div>

        )
    }
}