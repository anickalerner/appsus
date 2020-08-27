import {TrashBinIcon} from '../../../cmps/Icons.jsx'

function formatHour(doneAt){
    const hour = doneAt.getHours();
    const minute = doneAt.getMinutes();
    const formatedHour = (hour < 10) ? `0${hour}` : hour;
    const formatedMinute = (minute < 10) ? `0${minute}` : minute;
    return `${formatedHour}:${formatedMinute}` ;
}

function formatDate(doneAt){
    const year = doneAt.getFullYear();
    const month = doneAt.getMonth();
    const date = doneAt.getDate();
    const formattedMonth = (month < 10) ? `0${month}` : month;
    const formattedDate = (date < 10) ? `0${date}` : date;
    return `${year}.${month}.${date}`;
}

function getDate(date){
    let dateStr = '';
    const doneAt = new Date(date);
    const oneDay = 1000 * 60 * 60 * 24;
    dateStr = (oneDay > Date.now() - date) ?
     formatHour(doneAt)
    :formatDate(doneAt);
    return dateStr;
}

export function Todo(props) {
    const { txt, doneAt, isEditing, updateTodo, checkTodo, idx } = props;

    getDate(doneAt);

    return <li onClick={() => checkTodo(idx)} >
        {/* <p className={(doneAt && !isEditing) ? 'checked' : ''} contentEditable={isEditing} >{txt}</p>
        <p>{doneAt ? getDate(doneAt) : ''}</p>
        <button><TrashBinIcon /></button> */}
        {isEditing ?
            <input value={txt} type="text" onChange={() => updateTodo(idx, event)} />
            : <div className="todo-content">
                <p className={`todo ${doneAt ? 'checked' : ''}`}>{txt}</p>
                <p>{doneAt ? getDate(doneAt) : ''}</p>
                <div className="edit-note"><button><TrashBinIcon /></button></div>
                </div>
        }
        </li>
}