import { Rating } from './Rating.jsx'
import { bookService } from '../../service/book-service.js';
import { ReviewPreview } from './ReviewPreview.jsx'

export class ReviewForm extends React.Component {
    state = {
        maxRate: 5,
        currRate: 3,
        fullName: '',
        description: '',
        book: null
    }

    elInput = React.createRef();

    componentDidMount() {
        this.loadBook();
    }

    loadBook() {
        bookService.getBook(this.props.bookId)
            .then(book => {
                this.setState({ book });
                this.elInput.current.focus();
            })
    }

    onChangeRate = (num) => {
        const newState = { ...this.state };
        newState.currRate = num;
        this.setState(newState);
    }

    onInput = (ev) => {
        const newState = { ...this.state };
        newState[ev.target.name] = ev.target.value;
        this.setState(newState)
    }

    onReviewSubmit = () => {
        const book = this.state.book
        const { currRate, fullName, description } = this.state;
        if(!fullName || !description)   return;
        
        bookService.addReview(book.id, { currRate, fullName, description })
        this.loadBook();
    }

    renderReviews = () => {
        const book = this.state.book
        if (!book.reviews) book.reviews = [];
        return book.reviews.map((review, idx) => <ReviewPreview onRemoveReview={this.onRemoveReview} key={idx} review={review} />)
    }

    onRemoveReview = (reviewId) =>{
        const book = this.state.book;
        bookService.removeReview(book.id, reviewId);
        this.loadBook();
    }

    render() {
        if (!this.state.book) return <h1>Loading...</h1>
        const { maxRate, currRate } = this.state;
        return <div className="review-container rounded aps-box-shadow-big">
            <section className="review-form">
                <input ref={this.elInput} onInput={this.onInput} placeholder="Enter your full name" name="fullName" type="text" />
                <Rating outOf={maxRate} currRate={currRate} onChangeRate={this.onChangeRate} />
                <textarea placeholder="Description." onInput={this.onInput} name="description" id="" cols="30" rows="10"></textarea>
                <button onClick={this.onReviewSubmit}>Submit</button>
            </section>
            <ul className="reviews-list">
                {this.renderReviews()}
            </ul>
        </div>
    }
}