import eventBus from '../../../service/event-bus-service.js';
import { NoteIcons } from './NoteIcons.jsx';
import { InNoteEdit } from './InNoteEdit.jsx';
import { NoteButtons } from './NoteButtons.jsx';
const {withRouter} = ReactRouterDOM;

class _NoteText extends React.Component {
    state = {
        isEditing: false
    }

    elText = React.createRef();

    componentDidMount() {
        this.setState({ ...this.props })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ ...this.props, isEditing: false })
        }
    }

    onEdit = () => {
        setTimeout(() => {
            this.setState({ isEditing: true });
            this.elText.current.focus();
        }, 0)
    }

    onSendToMail = ()=>{
        const {title, content} = this.state.info;
        this.props.history.push(`/mail?subject=${title}&body=${content}`);
    }

    onColorChange = (ev) => {
        const info = { ...this.state.info };
        info.backgroundColor = ev.target.value;
        this.setState({ info })
    }

    onChangeLabel = (ev) => {
        const info = { ...this.state.info };
        info.label = ev.target.innerText;
        this.setState({ info });
    }

    onUpdate = () => {
        const { id, info } = this.state;
        info.content = this.elText.current.innerText;
        eventBus.emit('update-note', { id, info })
    }

    render() {
        const { info, id, isEditing, type, iconSize } = this.state;
        if (!info) return <h1>Loading...</h1>;
        return <div style={{ backgroundColor: info.backgroundColor }} className="note rounded">{isEditing ?
            <input name="title" value={info.title} onChange={this.onChange} type="text" />
            : <h1>{this.props.info.title}</h1>}
            <p ref={this.elText} suppressContentEditableWarning={true} contentEditable={isEditing}>{info.content}</p>
            {isEditing ?
                <InNoteEdit iconSize={iconSize} onColorChange={this.onColorChange} onChangeLabel={this.onChangeLabel} onUpdate={this.onUpdate} />
                : <NoteButtons id={id} iconSize={iconSize} onSendToMail={this.onSendToMail} onEdit={this.onEdit} />
            }
            <NoteIcons type={type} label={info.label} />
        </div>
    }

}

export const NoteText = withRouter(_NoteText);