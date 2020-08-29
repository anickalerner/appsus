//import BookApp from 'BookApp.jsx'
import eventBus from './service/event-bus-service.js'

export default class Home extends React.Component {

    state = {
        //isFrontImgVisible: false
    }

    componentDidMount(){
        eventBus.emit('change-app', false);
    }

    // componentDidMount() {
    //     this.setState({ isFrontImgVisible: true })
    // }

    render() {
        return (
            <section className="home-container">
                <h2>Home</h2>
            </section>
        )
    }
}