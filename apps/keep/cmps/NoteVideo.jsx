import { TrashBinIcon, EditIcon, CheckIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';

export class NoteVideo extends React.Component {
    state = {
        isEditing: false
    }

    componentDidMount() {
        this.setState({ ...this.props })
    }

    getVideoLink(url){
        const videoCode = new URLSearchParams(url);
        console.log(videoCode);
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
        newInfo[ev.target.name] = ev.target.value;
        this.setState({ info: newInfo });
    }

    render() {
        const { info, isEditing, id } = this.state;
        if (!info) return <h1>Loading...</h1>
        this.getVideoLink(info.url);
        return isEditing ? <div className="note">
            <input name="title" placeholder="Video's title" value={info.title || ''} onChange={this.onChange} type="text" />
            <input name="url" value={info.url} placeholder="Video's url" onChange={this.onChange} type="text" />
            <div className="edit-note">
                <button onClick={() => eventBus.emit('update-note', {id, info})}><CheckIcon /></button>
            </div>
        </div>
            : <div className="note">
                {info.title && <h2>{info.title}</h2>}
                <iframe src={info.url} alt="" />
                <div className="edit-note">
                    <button onClick={this.onEdit}><EditIcon /></button>
                    <button onClick={() => eventBus.emit('remove-note', id)}><TrashBinIcon /></button>
                </div>
            </div>
    }
}