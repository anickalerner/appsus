export function Todo(props) {
    const { txt, doneAt, isEditing, update, idx } = props;
    
    return <li className="todo" >{isEditing ?
        <input value={txt} type="text" onChange={() => update(idx, event)} />
        : `${txt} ${doneAt ? new Date(doneAt) : ''}`
    }</li>
}