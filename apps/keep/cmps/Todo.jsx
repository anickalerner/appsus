import {dateService} from '../service/date-service.js';

export function Todo(props) {
    const { txt, doneAt, isEditing, updateTodo, checkTodo, idx } = props;


    return <li onClick={() => checkTodo(idx)} >
        {isEditing ?
            <input value={txt} type="text" onChange={() => updateTodo(idx, event)} />
            : <div className="todo-content">
                <p className={`todo ${doneAt ? 'checked' : ''}`}>{txt}</p>
                <h5>{doneAt ? dateService.getDate(doneAt) : ''}</h5>
                </div>
        }
        </li>
}