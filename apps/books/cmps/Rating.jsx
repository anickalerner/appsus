const CHECKED = '../assets/img/checked.png';
const UNCHECKED = '../assets/img/unchecked.png';

export class Rating extends React.Component{
    state = {
        outOf: null,
        currRate: null
    }

    componentDidMount(){
        const {outOf, currRate} = this.props;
        this.setState({outOf, currRate});
    }


    renderStars(outOf, currRate){
        let imgs = [];
        for(let i = 0; i < outOf; i++){
            imgs.push(<div key={i + 1} onClick={() =>{
                this.setState({currRate: i + 1})
                this.props.onChangeRate(i + 1)}
            }><img  src={(i < currRate) ? CHECKED : UNCHECKED}/></div>); 
        }
        return <div className='rate-select'>{imgs}</div>;
    }

    render(){
        let {outOf, currRate} = this.state;
        if(!outOf)  return <h2>Loading...</h2>
        return <div>
            {this.renderStars(outOf, currRate)}
        </div>
    }
}