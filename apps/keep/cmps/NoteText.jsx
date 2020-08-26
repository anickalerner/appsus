import { TrashBinIcon, EditIcon, TextIcon, CheckIcon } from '../../../cmps/Icons.jsx';
import { Longtxt } from '../../../cmps/Longtxt.jsx';
import eventBus from '../../service/event-bus-service.js';

export class NoteText extends React.Component {
    state = {
        isEditing: false
    }

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
        this.setState({ isEditing: true })
    }

    onChange = (ev) => {
        const newInfo = this.state.info;
        newInfo.txt = ev.target.value;
        this.setState({ info: newInfo });
    }

    render() {
        const { info, id, isEditing } = this.state;
        if (!info) return <h1>Loading...</h1>
        return <div className="note">
                {isEditing ?
                    <textarea className="note-text-edit" value={info.txt} onChange={this.onChange} cols="30" rows="10"></textarea>
                    : <Longtxt txt={info.txt} />}
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