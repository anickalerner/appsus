import { Todo } from './Todo.jsx'
import { TrashBinIcon, PaletteIcon, EditIcon, CheckIcon, PlusIcon, TodoListIcon, PinIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';

export class NoteTodos extends React.Component {
    state = {
        isEditing: false,
        newTodoVal: ''
    }

    elColorPicker = React.createRef();

    componentDidMount() {
        this.setState({ ...this.props });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            console.log('changing props');
            this.setState({ ...this.props, isEditing: false })
        }
    }

    updateTodo = (idx, ev) => {
        const value = ev.target.value;
        const info = { ...this.state.info };
        const todos = [...info.todos];
        if (!value) todos.splice(idx, 1);
        else todos[idx].txt = ev.target.value;
        info.todos = todos;
        this.setState({ info });
    }

    checkTodo = (idx) => {
        const { info, id } = this.state;
        (!info.todos[idx].doneAt) ?
            info.todos[idx].doneAt = Date.now()
            : info.todos[idx].doneAt = null;
        eventBus.emit('update-note', { id, info })
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

    onColorPick = () => {
        this.elColorPicker.current.focus();
        this.elColorPicker.current.click();
    }

    onColorChange = (ev) => {
        const info = { ...this.state.info };
        info.backgroundColor = ev.target.value;
        this.setState({ info })
    }

    onEdit = () => {
        this.setState({ isEditing: true });
    }

    onAddTodo = (id) => {
        const { newTodoVal } = this.state;
        if (!newTodoVal) return;
        const info = { ...this.state.info };
        info.todos.push({ txt: newTodoVal, doneAt: null });
        eventBus.emit('update-note', { id, info });
        this.setState({ newTodoVal: '' });
    }

    onChangeAddTodo = (ev) => {
        this.setState({ newTodoVal: ev.target.value })
    }

    render() {
        const { info, id, isEditing, newTodoVal,} = this.state;
        if (!info) return <h1>Loading...</h1>
        return <div style={{backgroundColor: info.backgroundColor}} className="note rounded">
            {isEditing ?
                <input value={info.title} onChange={this.onChangeTitle} type="text" />
                : <h1>{this.props.info.title}</h1>}
            <ul>{this.renderTodos()}</ul>
            {!isEditing && <input placeholder="Add a new todo" value={newTodoVal} onChange={this.onChangeAddTodo} type="text" />}

            {isEditing ?
                <div className="edit-note">
                    <CheckIcon size='1.5em' onClick={() => eventBus.emit('update-note', { id, info })} />
                    <div className="color-picker-wrapper">
                        <input onChange={this.onColorChange} ref={this.elColorPicker} type="color" />
                        <PaletteIcon size='1.5em' onClick={this.onColorPick} />
                    </div>
                </div>
                :
                <div className="edit-note">
                    <PlusIcon size='1.5em' onClick={() => this.onAddTodo(id)} />
                    <EditIcon size='1.5em' onClick={this.onEdit} />
                    <TrashBinIcon size='1.5em' onClick={() => eventBus.emit('remove-note', id)} />
                    <PinIcon size='1.5em' onClick={() => eventBus.emit('pin-note', id)} />
                </div>
            }
            <div className="note-icon"><TodoListIcon /></div>
        </div>
    }
}