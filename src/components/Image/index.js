import React from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';
import './Image.css'
import $ from 'jquery'
// eslint-disable-next-line
import annyang from 'annyang';
var animationTimes = 0;
var s = true;
export default class Image extends React.Component{
    
    constructor(props){
        super(props);
        if (s == true){
            s = false;
            this.state = {
                imageList : this.props.showImage,
                actualImage : this.props.showImage[0],
                imageDefault : this.props.imageDefault
            }
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            actualImage : this.state.imageList[0]
        })
        this.animacion()
    }

    /*getLastAnimation(){
        this.state.imageList.find(this.state.actualImage);
    }*/

    animacion(){ 
        
        var timerId = setInterval(()=>{
            let actualMargin = parseInt($('.animacion').css('margin-top'),10);
            $('.animacion').css({'margin-top': actualMargin-240});
            if(actualMargin <= -2640){
                $('.animacion').css({'margin-top': '0px'});
                animationTimes++;
                this.setState({
                    actualImage : this.state.imageList[animationTimes]
                })
                if(animationTimes >= this.state.imageList.length){
                    this.state.imageList.shift();
                    this.setState({
                        actualImage: this.state.imageDefault,
                        imageList : this.state.imageList
                    })
                    clearInterval(timerId);
                    s = true;
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
                <img className="animacion" alt="" src={"./Imagenes/"+this.state.actualImage} />
            </li>
        )
    }
}