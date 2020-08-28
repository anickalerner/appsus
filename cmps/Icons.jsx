function getFontSize(size){
    return { fontSize: size ? size : '1em' };
}
function icon(className, style, callback) {
    return <i className={className} style={style} onClick={callback}></i>;    
}

//Common
export function GridIcon({ size, onClick }) {
    return icon("fas fa-th", getFontSize(size), onClick);
}
export function BookIcon({ size, onClick }) {
    return icon("fas fa-book", getFontSize(size), onClick);
}
export function LightBulbIcon({ size, onClick }) {
    return icon("far fa-lightbulb", getFontSize(size), onClick);
}
export function MailIcon({ size, onClick }) {
    return icon("far fa-envelope", getFontSize(size), onClick);
}

//Mail
export function TrashBinIcon({ size, onClick }){
    return icon("fas fa-trash", getFontSize(size), onClick);
}
export function InboxIcon({ size, onClick }) {
    return icon("fas fa-inbox", getFontSize(size), onClick);
}
export function StarEmptyIcon({ size, onClick }) {
    return icon("far fa-star", getFontSize(size), onClick);
}
export function StarFullIcon({ size, onClick }) {
    return icon("fas fa-star", getFontSize(size), onClick);
}
export function SentIcon({ size, onClick }) {
    return icon("fas fa-share-square", getFontSize(size), onClick);
}
export function DraftIcon({ size, onClick }) {
    return icon("fab fa-firstdraft", getFontSize(size), onClick);
}
export function PlusIcon({ size, onClick }) {
    return icon("fas fa-plus", getFontSize(size), onClick);
}
export function EnvelopeOpenIcon({ size, onClick }) {
    return icon("fas fa-envelope-open", getFontSize(size), onClick);
}
export function EnvelopeIcon({ size, onClick }) {
    return icon("fas fa-envelope", getFontSize(size), onClick);
}
export function PaperPlaneIcon({ size, onClick }) {
    return icon("fas fa-paper-plane", getFontSize(size), onClick);
}

//Keep
export function PaletteIcon({ size, onClick }) {
    return icon("fas fa-palette", getFontSize(size), onClick);
}
export function ImageIcon({ size, onClick }) {
    return icon("fas fa-image", getFontSize(size), onClick);
}
export function YoutubeIcon({ size, onClick }) {
    return icon("fab fa-youtube", getFontSize(size), onClick);
}
export function SoundIcon({ size, onClick }) {
    return icon("fas fa-volume-up", getFontSize(size), onClick);
}
export function FontIcon({ size, onClick }) {
    return icon("fas fa-font", getFontSize(size), onClick);
}
export function EditIcon({ size, onClick }) {
    return icon("fas fa-edit", getFontSize(size), onClick);
}
export function CopyIcon({ size, onClick }) {
    return icon("fas fa-copy", getFontSize(size), onClick);
}
export function CheckIcon({ size, onClick }) {
    return icon("fas fa-check", getFontSize(size), onClick);
}
export function NoteIcon({size, onClick}){
    return icon("far fa-sticky-note", getFontSize(size), onClick);
}
export function PinIcon({ size, onClick }) {
    return icon("fas fa-thumbtack", getFontSize(size), onClick);
}
export function ReminderIcon({ size, onClick }){
    return icon("far fa-bell", getFontSize(size), onClick);
}
export function ArchiveIcon({ size, onClick }){
    return icon("fas fa-archive", getFontSize(size), onClick);
}
export function TextIcon({ size, onClick }){
    return icon("fas fa-font", getFontSize(size), onClick);
}
export function TodoListIcon({ size, onClick }){
    return icon("fas fa-list-ul", getFontSize(size), onClick);
}
export function LabelIcon({ size, onClick }){
    return icon("fas fa-tag", getFontSize(size), onClick);
}


