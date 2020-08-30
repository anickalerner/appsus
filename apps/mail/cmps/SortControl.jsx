export function SortControl(props) {
    
    function onSort(){
        const selectEl = document.getElementById("sort-control");
        var sortBy = selectEl.options[selectEl.selectedIndex].value.toLowerCase();
        props.sortMails(sortBy);
    }
    
    return (
        <div className="form-group">
            <label htmlFor="sort-control">Sort mails by </label>
            <select className="form-control form-control-sm aps-box-shadow-small rounded-small" onChange={onSort} id="sort-control">
                <option>Date</option>
                <option>Subject</option>
            </select>
        </div>
    )
}