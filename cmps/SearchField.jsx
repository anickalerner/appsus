import { SearchIcon, TimesIcon } from './Icons.jsx';
import eventBus from '../service/event-bus-service.js';

export class SearchField extends React.Component {

    state = {
        searchValue: null
    }

    clearSearch = () => {
        this.setState({ searchValue: null});
    }

    onInput = (ev) => {
        this.setState({ searchValue: event.target.value });
        eventBus.emit(this.props.event, event.target.value);
    }

    render() {
        return <div className="aps-search rounded aps-box-shadow-small">
            <SearchIcon />
            <input onChange={this.onInput} placeholder={this.props.placeholder} type="text" id="search-field" />

            {this.state.searchValue && <TimesIcon onClick={this.clearSearch} />}
        </div>
    }
}