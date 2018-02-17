import React from 'react';
import ReactDOM from 'react-dom';
import './Image.css'
import $ from 'jquery'

export default class Image extends React.Component{
    constructor(props){
        super(props);
<<<<<<< HEAD
    }
=======
        this.state = {
            imageList : this.props.showImage,
            actualImage : this.props.showImage[0],
            imageDefault : this.props.imageDefault
        }
    }

>>>>>>> 486ba5cba189a6025c8f5a1ac7ad857a75926ed4
    animacion(){
        var animationTimes = 0;
        var timerId = setInterval(()=>{
            let actualMargin = parseInt($('.animacion').css('margin-top'));
            $('.animacion').css({'margin-top': actualMargin-240});
<<<<<<< HEAD
            if(actualMargin <= -2880){
                $('.animacion').css({'margin-top': '0px'});
                clearInterval(timerId);
                return true;
=======
            if(actualMargin <= -2640){
                $('.animacion').css({'margin-top': '0px'});
                animationTimes++;
                this.setState({
                    actualImage : this.state.imageList[animationTimes]
                })
                if(animationTimes >= this.state.imageList.length){
                    this.setState({
                        actualImage: this.state.imageDefault
                    })
                    clearInterval(timerId);
                }
>>>>>>> 486ba5cba189a6025c8f5a1ac7ad857a75926ed4
            }
        },100);
    }

    componentDidMount(){
<<<<<<< HEAD
        this.animacion();
        console.log('sdass')
=======
        this.animacion()
>>>>>>> 486ba5cba189a6025c8f5a1ac7ad857a75926ed4
    }

    render(){
        return(            
            <li>
<<<<<<< HEAD
                <img className="animacion" src={this.props.showImage} />
            </li> 
=======
                <img className="animacion" src={this.state.actualImage} />
            </li>
>>>>>>> 486ba5cba189a6025c8f5a1ac7ad857a75926ed4
        )
    }
}