export function ViewFilter(props) {
    
    function changeView(){
        const filterEl = document.getElementById("view-filter");
        var filter = filterEl.options[filterEl.selectedIndex].value.toLowerCase();
        props.onChange(filter);
    }
    
    return (
        <div className="form-group">
            <label htmlFor="view-filter">Filter mails</label>
            <select className="form-control form-control-sm aps-box-shadow-small rounded-small" onChange={changeView} id="view-filter">
                <option>All</option>
                <option>Read</option>
                <option>Unread</option>
            </select>
        </div>
    )
}