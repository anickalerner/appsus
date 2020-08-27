export class LongText extends React.Component {
    state = {
        isLongTxtShown: false
    }

    onToggleShown = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    getTextClip = (text, length, showMore) => {
        if (text.length <= length) return text;
        const textToShow = (this.state.isLongTxtShown) ? text : text.substr(0, length).trim() + '...';
        return (
            <React.Fragment>
                {textToShow}
                {showMore && this.getButton()}
            </React.Fragment>
        )
    }

    getButton = () => {
        var buttonText = this.state.isLongTxtShown ? 'Less' : 'More';
        return (<button onClick={this.toggleMoreText} className="read-more-btn">{buttonText}</button>);
    }

    render() {
        const {text, length, showMore} = this.props;
        return (
            this.getTextClip(text, length, showMore)
        );
    }
}