import { Todo } from './Todo.jsx'
import { TrashBinIcon, EditIcon, PlusIcon, MailIcon, PinIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';
import { NoteIcons } from './NoteIcons.jsx';
import { InNoteEdit } from './InNoteEdit.jsx';

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
            this.setState({ ...this.props, isEditing: false })
        }
    }

    updateTodo = (idx, ev) => {
        const value = ev.target.value;
        const info = { ...this.state.info };
        const todos = [...info.todos];
        if (!value) {
            eventBus.emit('notify', { msg: 'todo deleted', type: 'todo-deleted' });
            todos.splice(idx, 1);
        }
        else todos[idx].content = ev.target.value;
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

    onChange = (ev) => {
        const info = { ...this.state.info };
        info[ev.target.name] = ev.target.value;
        this.setState({ info });
    }

    onChangeLabel = (ev) => {
        const info = { ...this.state.info };
        info.label = ev.target.innerText;
        this.setState({ info });
    }

    onEdit = () => {
        this.setState({ isEditing: true });
    }

    onSendToMail = () => {
        const { title, todos } = this.state.info;
        let body = '';
        todos.forEach((todo, idx) => body+=`${idx + 1}. ${todo.content}\n`);
        const mail = {subject: title, body};
        console.log(mail);
    }

    onAddTodo = (id) => {
        const { newTodoVal } = this.state;
        if (!newTodoVal) {
            eventBus.emit('notify', { msg: 'Write something to add first.', type: 'note-add-denied' });
            return;
        }
        const info = { ...this.state.info };
        info.todos.push({ content: newTodoVal, doneAt: null });
        eventBus.emit('update-note', { id, info });
        this.setState({ newTodoVal: '' });
    }

    onChangeAddTodo = (ev) => {
        this.setState({ newTodoVal: ev.target.value })
    }

    onUpdate = () => {
        const { id, info } = this.state;
        eventBus.emit('update-note', { id, info })
    }

    render() {
        const { info, id, isEditing, newTodoVal, type, iconSize } = this.state;
        if (!info) return <h1>Loading...</h1>
        return <div style={{ backgroundColor: info.backgroundColor }} className="note rounded">
            {isEditing ?
                <input name="title" value={info.title} onChange={this.onChange} type="text" />
                : <h1>{this.props.info.title}</h1>}
            <ul className="todo-list">{this.renderTodos()}</ul>
            {!isEditing && <input placeholder="Add a new todo" value={newTodoVal} onChange={this.onChangeAddTodo} type="text" />}
            {isEditing ?
                <InNoteEdit onColorChange={this.onChange} onChangeLabel={this.onChangeLabel} onUpdate={this.onUpdate} />
                :
                <div className="edit-note">
                    <MailIcon size={iconSize} onClick={this.onSendToMail} />
                    <PlusIcon size={iconSize} onClick={() => this.onAddTodo(id)} />
                    <EditIcon size={iconSize} onClick={this.onEdit} />
                    <TrashBinIcon size={iconSize} onClick={() => eventBus.emit('remove-note', id)} />
                    <PinIcon size={iconSize} onClick={() => eventBus.emit('pin-note', id)} />
                </div>
            }
            <NoteIcons type={type} label={info.label} />
        </div>
    }
}