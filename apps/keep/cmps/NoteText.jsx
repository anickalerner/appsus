import { TrashBinIcon, TextIcon } from '../../../cmps/Icons.jsx';
import { Longtxt } from '../../../cmps/Longtxt.jsx';

export class NoteText extends React.Component {
    state = {
        isEditing: false
    }

    componentDidMount() {
        this.setState({ ...this.props })
    }

    onEdit = () => {
        this.setState({ isEditing: true })
        console.log(this.state);
    }

    onChange = (ev) => {
        this.setState({ noteAddVal: ev.target.value });
    }

    render() {
        const { info, id, isEditing } = this.state;
        if (!info) return <h1>Loading...</h1>
        console.log(this.state);
        return isEditing ?
            <div>
                <textarea value={info.txt} onChange={this.onChange} cols="30" rows="10"></textarea>
            </div> :
            <div className="note">
                <Longtxt txt={info.txt} />
                <div className="edit-note">
                    <button onClick={this.onEdit}><TextIcon /></button>
                    <button onClick={() => this.props.removeNote(id)}><TrashBinIcon /></button>
                </div>
            </div>
    }

}