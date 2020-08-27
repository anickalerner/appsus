import { NavBar } from './NavBar.jsx';
import { GridIcon } from './Icons.jsx';

export class AppsMenuIcon extends React.Component {
    state = {
        isHovering: false
    };
    
    handleMouseHover = () => {
        this.setState({isHovering: !this.state.isHovering});
    }

    render() {
        return (
            <div onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}>
                <GridIcon/>
                {this.state.isHovering && <NavBar/>}
            </div>
        )
    }
}
