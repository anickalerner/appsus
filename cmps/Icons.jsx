function getFontSize(size){
    return { fontSize: size ? size : '1em' };
}
//Mail
export function TrashBinIcon({size}){
    return (<i className="fas fa-trash" style={getFontSize(size)}></i>)
}
export function InboxIcon({ size }) {
    return (<i className="fas fa-inbox" style={getFontSize(size)}></i>)
}
export function StarIcon({ size }) {
    return (<i className="fas fa-star" style={getFontSize(size)}></i>)
}
export function SentIcon({ size }) {
    return (<i className="fas fa-share-square" style={getFontSize(size)}></i>)
}
export function DraftIcon({ size }) {
    return (<i className="fas fa-firstdraft" style={getFontSize(size)}></i>)
}
export function PlusIcon({ size }) {
    return (<i className="fas fa-plus" style={getFontSize(size)}></i>)
}
export function EnvelopeOpenIcon({ size }) {
    return (<i className="fas fa-envelope-open" style={getFontSize(size)}></i>)
}
export function EnvelopeIcon({ size }) {
    return (<i className="fas fa-envelope" style={getFontSize(size)}></i>)
}

//Keep
export function PaletteIcon({ size }) {
    return (<i className="fas fa-palette" style={getFontSize(size)}></i>)
}
export function ImageIcon({ size }) {
    return (<i className="fas fa-image" style={getFontSize(size)}></i>)
}
export function PinIcon({ size }) {
    return (<i className="fas fa-thumbtack" style={getFontSize(size)}></i>)
}
export function YoutubeIcon({ size }) {
    return (<i className="fas fa-youtube" style={getFontSize(size)}></i>)
}
export function SoundIcon({ size }) {
    return (<i className="fas fa-volume-up" style={getFontSize(size)}></i>)
}
export function FontIcon({ size }) {
    return (<i className="fas fa-font" style={getFontSize(size)}></i>)
}
export function EditIcon({ size }) {
    return (<i className="fas fa-edit" style={getFontSize(size)}></i>)
}
export function CopyIcon({ size }) {
    return (<i className="fas fa-copy" style={getFontSize(size)}></i>)
}
export function CheckIcon({ size }) {
    return (<i className="fas fa-check" style={getFontSize(size)}></i>)
}
export function NoteIcon({size}){
    return <i className="far fa-sticky-note" style={getFontSize(size)}></i>
}
export function ReminderIcon({size}){
    return <i className="far fa-bell" style={getFontSize(size)}></i>
}
export function ArchiveIcon({size}){
    return <i className="fas fa-archive" style={getFontSize(size)}></i>
}
export function TextIcon({size}){
    return <i className="fas fa-font" style={getFontSize(size)}></i>
}
export function TodoListIcon({size}){
    return <i className="fas fa-list-ul" style={getFontSize(size)}></i>
}


