import eventBus from '../service/event-bus-service.js';

export class Notification extends React.Component {
    state = {
        isShown: false,
        msg: '',
        type: ''
    }
    unsubscribe;
    componentDidMount() {
        this.unsubscribe = eventBus.on('notify', (data) => {
            console.log(data);
            this.setState({ isShown: true, msg: data.msg, type: data.type });
            setTimeout(() => this.setState({ isShown: false }), 3000);
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }

    getComponent = (msg) => {
        if (this.state.isShown) {
            return (
                <div className="inner">
                    <span className="close btn" onClick={() => this.setState({ isShown: false })}>&times;</span>
                    <div>{msg}</div>
                </div>
            )
        }
        else return '';
    }
    render() {
        const { isShown, msg, type } = this.state;
        return (
            <div className={`notification-box dark-msg rounded-small ${type}`}>
                {this.getComponent(msg)}
            </div>
        )
    }
}
