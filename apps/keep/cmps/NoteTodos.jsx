import {Todo} from './Todo.jsx'

export class NoteTodos extends React.Component {
    state = {
        
    }

    componentDidMount(){
        this.setState({...this.props})
    }

    renderTodos() {
        return this.props.info.todos.map((todo, idx) => <Todo key={idx} {...todo} />)
    }

    render() {
        const {info} = this.state;
        if(!info)   return <h1>Loading...</h1>
        return <div className="note">
            <h1>{this.props.info.label}</h1>
            <ul>{this.renderTodos()}</ul>
        </div>
    }
}