import { Todo } from './Todo.jsx'
import { TrashBinIcon, EditIcon, CheckIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../service/event-bus-service.js';

export class NoteTodos extends React.Component {
    state = {
        isEditing: false
    }

    componentDidMount() {
        this.setState({ ...this.props });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            console.log('changing props');
            this.setState({...this.props, isEditing: false})
        }
    }

    updateTodo = (idx, ev) => {
        const info = { ...this.state.info };
        const todos = [...info.todos];
        todos[idx].txt = ev.target.value;
        info.todos = todos;
        this.setState({ info });
    }

    renderTodos() {
        const { todos } = this.state.info;
        return todos.map((todo, idx) => <Todo key={idx} idx={idx} update={this.updateTodo} isEditing={this.state.isEditing} {...todo} />)
    }

    onChangeLabel = (ev) => {
        const info = { ...this.state.info };
        info.label = ev.target.value;
        this.setState({ info });
    }

    onEdit = () => {
        this.setState({ isEditing: true });
    }

    render() {
        const { info, id, isEditing } = this.state;
        if (!info) return <h1>Loading...</h1>
        return <div className="note">
            {isEditing ? <input value={info.label} onChange={this.onChangeLabel} type="text" /> : <h1>{this.props.info.label}</h1>}
            <ul>{this.renderTodos()}</ul>
            {isEditing ? 
            <div className="edit-note">
                <button onClick={() => eventBus.emit('update-note', {id, info})}><CheckIcon /></button>
            </div>
            :
                <div className="edit-note">
                    <button onClick={this.onEdit}><EditIcon /></button>
                    <button onClick={() => eventBus.emit('remove-note', id)}><TrashBinIcon /></button>
                </div>
            }
        </div>
    }
}