export class NoteText extends React.Component {
    state = {
        
    }

    componentDidMount(){
        this.setState({...this.props})
    }

    render() {
        const {info} = this.state;
        if(!info)   return <h1>Loading...</h1>
        return <div className="note">
            <p>{info.txt}</p>
        </div>
    }

}