import {dateService} from '../service/date-service.js';

export function Todo(props) {
    const { txt, doneAt, isEditing, updateTodo, checkTodo, idx } = props;


    return <li>
        {isEditing ?
            <input value={txt} type="text" onChange={() => updateTodo(idx, event)} />
            : <div onClick={() => checkTodo(idx)} className="todo-content">
                <p className={`todo ${doneAt ? 'checked' : ''}`}>{txt}</p>
                <h5>{doneAt ? dateService.getDate(doneAt) : ''}</h5>
                </div>
        }
        </li>
}