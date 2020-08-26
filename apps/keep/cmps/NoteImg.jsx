export function NoteImg(props) {
    return <div>
        <h1>{props.info.title}</h1>
        <img src={props.info.url} alt=""/>
    </div>
}