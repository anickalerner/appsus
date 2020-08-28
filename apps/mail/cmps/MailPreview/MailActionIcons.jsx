import { TrashBinIcon } from '../../../../cmps/Icons.jsx';

export function MailActionIcons({ mail, onDelete }) {
    return (
        <td>
            <TrashBinIcon onClick={onDelete}/>
            
        </td>
    )
}


