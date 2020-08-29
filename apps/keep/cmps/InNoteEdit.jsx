import { PaletteIcon, CheckIcon, LabelIcon } from '../../../cmps/Icons.jsx';

export function InNoteEdit(props) {

    const elColorPicker = React.createRef();

    function onColorPick() {
        elColorPicker.current.click();
    }

    const { onChangeLabel, onColorChange, onUpdate } = props;
    const iconSize = '1.1em'

    return <div className="edit-note">
        <CheckIcon size={iconSize} onClick={onUpdate} />
        <div className="color-picker-wrapper">
            <input name="backgroundColor" onChange={onColorChange} ref={elColorPicker} type="color" />
            <PaletteIcon size={iconSize} onClick={onColorPick} />
            </div>
            <div className="label-wrapper">
                <LabelIcon size={iconSize} />
                <ul className="label-list rounded">
                    <li onClick={onChangeLabel}>Reminder</li>
                    <li onClick={onChangeLabel}>Archive</li>
                    <li onClick={onChangeLabel}>None</li>
                </ul>
            </div>
        </div>
}

