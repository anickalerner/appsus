
export function ReviewPreview(props) {
    const review = props.review
    return <div className="review">
        <h3>{review.fullName}</h3>
        <h2>Rating: {review.currRate}/5</h2>
        <p>{review.description}</p>
        <button onClick={() =>{
            props.onRemoveReview(review.id)
        }}>Remove</button>
    </div>
}