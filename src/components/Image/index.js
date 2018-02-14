import React from 'react';
import ReactDOM from 'react-dom';
import './Image.css'
import $ from 'jquery'

export default class Image extends React.Component{
    animacion(){
        var timerId = setInterval(function(){
            let actualMargin = parseInt($('.animacion').css('margin-top'));
            $('.animacion').css({'margin-top': actualMargin-240});
            if(actualMargin <= -2880){
                console.log('asdasd')
                $('.animacion').css({'margin-top': '0px'});
                clearInterval(timerId);
            }
        },100);
    }

    componentDidMount(){
        this.animacion();
    }

    render(){
        return(
            <li>
                <img className="animacion" src={this.props.showImage} />
            </li>
        )
    }
}