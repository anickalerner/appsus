import { Todo } from './Todo.jsx'
import { TrashBinIcon, EditIcon, CheckIcon, PlusIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';

export class NoteTodos extends React.Component {
    state = {
        isEditing: false,
        newTodoVal: ''
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
        const value = ev.target.value;
        const info = { ...this.state.info };
        const todos = [...info.todos];
        if(!value)  todos.splice(idx, 1);
        else todos[idx].txt = ev.target.value;
        info.todos = todos;
        this.setState({ info }, console.log(this.state));
    }

    checkTodo = (idx)=>{
        const {info, id} = this.state;
        (!info.todos[idx].doneAt) ?
            info.todos[idx].doneAt = Date.now()
            : info.todos[idx].doneAt = null;
        eventBus.emit('update-note', {id, info})
    }

    renderTodos() {
        const { todos } = this.state.info;
        return todos.map((todo, idx) => <Todo key={idx} idx={idx} checkTodo={this.checkTodo} updateTodo={this.updateTodo} isEditing={this.state.isEditing} {...todo} />)
    }

    onChangeTitle = (ev) => {
        const info = { ...this.state.info };
        info.title = ev.target.value;
        this.setState({ info });
    }

    onEdit = () => {
        this.setState({ isEditing: true });
    }

    onAddTodo = (id)=>{
        const {newTodoVal} = this.state;
        if(!newTodoVal) return;
        const info = {...this.state.info};
        info.todos.push({txt: newTodoVal, doneAt: null});
        eventBus.emit('update-note', {id, info});
        this.setState({newTodoVal: ''});
    }

    onChangeAddTodo = (ev) =>{
        this.setState({newTodoVal: ev.target.value})
    }

    render() {
        const { info, id, isEditing, newTodoVal } = this.state;
        if (!info) return <h1>Loading...</h1>
        return <div className="note rounded aps-box-shadow-small">
            {isEditing ?
            <input value={info.title} onChange={this.onChangeTitle} type="text" />
            : <h1>{this.props.info.title}</h1>}
            <ul>{this.renderTodos()}</ul>
            {!isEditing && <input placeholder="Add a new todo" value={newTodoVal} onChange={this.onChangeAddTodo} type="text"/>}

            {isEditing ? 
            <div className="edit-note">
                <button onClick={() => eventBus.emit('update-note', {id, info})}><CheckIcon /></button>
            </div>
            :
                <div className="edit-note">
                    <button onClick={() => this.onAddTodo(id)}><PlusIcon /></button>
                    <button onClick={this.onEdit}><EditIcon /></button>
                    <button onClick={() => eventBus.emit('remove-note', id)}><TrashBinIcon /></button>
                </div>
            }
        </div>
    }
}