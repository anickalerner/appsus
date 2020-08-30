import eventBus from './service/event-bus-service.js'

export default class Home extends React.Component {

    componentDidMount(){
        eventBus.emit('change-app', false);
    }

    render() {
        return (
            <section className="home-container">
                <div className="welcome">
                    <img src="./assets/img/welcome.jpg" />
                </div>
            </section>
        )
    }
}