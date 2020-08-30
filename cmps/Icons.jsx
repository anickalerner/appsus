function getFontSize(size){
    return { fontSize: size ? size : '1em' };
}
function icon(className, props) {
    return <i className={className} style={getFontSize(props.size)} onClick={props.onClick}>
        {props.title && <div className="icon-title dark-msg rounded-small">{props.title}</div>}
    </i>;
}

//Common
export function GridIcon(props) {
    return icon("fas fa-th", props);
}
export function BookIcon(props) {
    return icon("fas fa-book", props);
}
export function LightBulbIcon(props) {
    return icon("far fa-lightbulb", props);
}
export function MailIcon(props) {
    return icon("far fa-envelope", props);
}
export function SearchIcon(props) {
    return icon("fas fa-search", props);
}
export function TimesIcon(props) {
    return icon("fas fa-times", props);
}

//Mail
export function TrashBinIcon(props){
    return icon("fas fa-trash", props);
}
export function InboxIcon(props) {
    return icon("fas fa-inbox", props);
}
export function StarEmptyIcon(props) {
    return icon("far fa-star", props);
}
export function StarFullIcon(props) {
    return icon("fas fa-star", props);
}
export function SentIcon(props) {
    return icon("fas fa-share-square", props);
}
export function DraftIcon(props) {
    return icon("fab fa-firstdraft", props);
}
export function PlusIcon(props) {
    return icon("fas fa-plus", props);
}
export function MailOpenIcon(props) {
    return icon("fas fa-envelope-open", props);
}
export function PaperPlaneIcon(props) {
    return icon("fas fa-paper-plane", props);
}
export function ReplyIcon(props) {
    return icon("fas fa-reply", props);
}

//Keep
export function PaletteIcon(props) {
    return icon("fas fa-palette", props);
}
export function ImageIcon(props) {
    return icon("fas fa-image", props);
}
export function YoutubeIcon(props) {
    return icon("fab fa-youtube", props);
}
export function SoundIcon(props) {
    return icon("fas fa-volume-up", props);
}
export function FontIcon(props) {
    return icon("fas fa-font", props);
}
export function EditIcon(props) {
    return icon("fas fa-edit", props);
}
export function CopyIcon(props) {
    return icon("fas fa-copy", props);
}
export function CheckIcon(props) {
    return icon("fas fa-check", props);
}
export function NoteIcon(props){
    return icon("far fa-sticky-note", props);
}
export function PinIcon(props) {
    return icon("fas fa-thumbtack", props);
}
export function ReminderIcon(props){
    return icon("far fa-bell", props);
}
export function ArchiveIcon(props){
    return icon("fas fa-archive", props);
}
export function TextIcon(props){
    return icon("fas fa-font", props);
}
export function TodoListIcon(props){
    return icon("fas fa-list-ul", props);
}
export function LabelIcon(props){
    return icon("fas fa-tag", props);
}
export function AudioIcon(props){
    return icon("fas fa-volume-up", props);
}


