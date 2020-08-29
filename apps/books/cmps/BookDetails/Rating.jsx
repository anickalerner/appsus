import {StarEmptyIcon, StarFullIcon} from '../../../../cmps/Icons.jsx'

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
        let stars = [];
        for(let i = 0; i < outOf; i++){
            const rate = i + 1
            stars.push(<div key={rate} onClick={() =>{
                this.setState({currRate: rate});
                this.props.onChangeRate(rate);
            }
            
        } >{i < currRate ? <StarFullIcon /> : <StarEmptyIcon />}</div>)
        }
        return <div className='rate-select'>{stars}</div>;
    }

    render(){
        let {outOf, currRate} = this.state;
        if(!outOf)  return <h2>Loading...</h2>
        return <div>
            {this.renderStars(outOf, currRate)}
        </div>
    }
}