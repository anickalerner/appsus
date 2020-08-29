export function BooksFilter(props){
    return (
        <section className='filter'>
            <h1>Filter</h1>
            <input onChange={props.onSetFilter} name="name" placeholder="Filter by name" type="text"></input>
            <input onChange={props.onSetFilter} name="price" placeholder="Filter by price" type="number"></input>
        </section>
    )
}