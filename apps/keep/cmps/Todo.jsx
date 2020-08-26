export function Todo(props){
    const {txt, doneAt} = props
    return <li >{`${txt} ${new Date(doneAt)}`}</li>
}