import { TrashBinIcon, EditIcon, TextIcon, CheckIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';

export class NoteText extends React.Component {
    state = {
        isEditing: false
    }

    elText = React.createRef()

    componentDidMount() {
        this.setState({ ...this.props })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            console.log('changing props');
            this.setState({...this.props, isEditing: false})
        }
    }

    onEdit = () => {
        setTimeout(() =>{
        this.setState({ isEditing: true });
        this.elText.current.focus();
        }, 0)
    }

    onUpdate = ()=>{
        const {id, info} = this.state;
        info.txt = this.elText.current.innerText;
        eventBus.emit('update-note', {id, info})
    }

    render() {
        const { info, id, isEditing } = this.state;
        if (!info) return <h1>Loading...</h1>;
        return <div className="note rounded aps-box-shadow-small">
            <p ref={this.elText} suppressContentEditableWarning={true} contentEditable={isEditing}>{info.txt}</p>
                {isEditing ?
                    <div className="edit-note">
                        <CheckIcon size='1.5em' onClick={this.onUpdate} />
                    </div>
                    :
                    <div className="edit-note">
                        <EditIcon onMouseUp={this.onEdit} />
                        <TrashBinIcon size='1.5em' onClick={() => eventBus.emit('remove-note', id)} />
                    </div>
                }
            </div>
    }

}