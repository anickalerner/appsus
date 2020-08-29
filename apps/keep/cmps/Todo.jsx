import {dateService} from '../service/date-service.js';

export function Todo(props) {
    const { content, doneAt, isEditing, updateTodo, checkTodo, idx } = props;


    return <li>
        {isEditing ?
            <input value={content} type="text" onChange={() => updateTodo(idx, event)} />
            : <div onClick={() => checkTodo(idx)} className="todo-content">
                <p className={`todo ${doneAt ? 'checked' : ''}`}>{content}</p>
                <h5>{doneAt ? dateService.getDate(doneAt) : ''}</h5>
                </div>
        }
        </li>
}