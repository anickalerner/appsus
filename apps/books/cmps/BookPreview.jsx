const {withRouter} = ReactRouterDOM;

function _BookPreview(props) {
    const book = props.bookToShow;
    const { title, thumbnail, id} = book;
    const {amount, currencyCode, isOnSale} = book.listPrice;

    function getCurrencyIcon(type) {
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

    function getPriceColor(price) {
        if (price > 150) return 'red';
        else if (price < 20) return 'green'
        return ''
    }

    function onShowDetails(){
        props.history.push(`book/${book.id}`)
    }

    return (
        <li onClick={onShowDetails} className='book-preview'>
            <div className="title"><h2>{title}</h2></div>
            <img src={thumbnail}  />
            <h3 className={getPriceColor(amount)}>{amount + getCurrencyIcon(currencyCode)}</h3>
            {isOnSale && <div className='on-sale'>On Sale!</div>}
        </li>
    )
}

export const BookPreview = withRouter(_BookPreview);