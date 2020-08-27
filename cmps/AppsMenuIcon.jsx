import { NavBar } from './NavBar.jsx';
import { GridIcon } from './Icons.jsx';

export class AppsMenuIcon extends React.Component {
    state = {
        isClicked: false
    };
    
    handleMouseHover = () => {
        this.setState({ isClicked: !this.state.isClicked});
    }

    render() {
        return (
            <div className="apps-menu-icon">
                <GridIcon onClick={this.handleMouseHover}/>
                {this.state.isClicked && <NavBar/>}
            </div>
        )
    }
}
