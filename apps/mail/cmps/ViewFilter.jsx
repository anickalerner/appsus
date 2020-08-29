export function ViewFilter(props) {
    function changeView(){
        const filterEl = document.getElementById("view-filter");
        var filter = filterEl.options[filterEl.selectedIndex].value.toLowerCase();
        props.onChange(filter);
    }
    return (
        <form>
            <label htmlFor="view-filter">Filter mails</label>
            <select className="form-control form-control-sm" onChange={changeView} id="view-filter">
                <option>All</option>
                <option>Read</option>
                <option>Unread</option>
            </select>
        </form>
    )
}