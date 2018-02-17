import React from 'react';
import ReactDOM from 'react-dom';
import './Image.css'
import $ from 'jquery'
import annyang from 'annyang';

export default class Image extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageList : this.props.showImage,
            actualImage : this.props.showImage[0],
            imageDefault : this.props.imageDefault
        }
    }

    animacion(){
        var animationTimes = 0;
        var timerId = setInterval(()=>{
            let actualMargin = parseInt($('.animacion').css('margin-top'));
            $('.animacion').css({'margin-top': actualMargin-240});
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
            }
        },100);
    }

    componentDidMount(){
        this.animacion()
    }

    render(){
        return(            
            <li>
                <img className="animacion" src={this.state.actualImage} />
            </li>
        )
    }
}