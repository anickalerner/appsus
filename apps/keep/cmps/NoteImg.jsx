export class NoteImg extends React.Component {
    state = {
        
    }

    componentDidMount(){
        this.setState({...this.props})
    }

    render() {
        const {info} = this.state;
        if(!info)  return <h1>Loading...</h1>
        return <div className="note">
            <h2>{info.title}</h2>
            <img src={info.url} alt="" />
        </div>
    }
}