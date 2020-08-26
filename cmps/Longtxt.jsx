export class Longtxt extends React.Component{
    state = {
        isLongTxtShown: false
    }

    onToggleShown = ()=>{
        this.setState({isLongTxtShown: !this.state.isLongTxtShown})
    }

    getTxt = () =>{
        const {txt} = this.props;
        return (this.state.isLongTxtShown) ? txt : `${txt.substr(0, 100)}...`
    }

    render(){
        const {isLongTxtShown} = this.state;
        const {txt} = this.props;
        this.getTxt();
        return((txt.length > 100)?
            <div>
                <p>{this.getTxt()}</p>
                <button onClick={this.onToggleShown}>{(isLongTxtShown) ? 'Show Less' : 'Show More'}</button>
            </div>
            :
    <p>{txt}</p>
        )
    }
}