import React from 'react';
import ReactDOM from 'react-dom';
import Image from '../Image'

export default class ImageList extends React.Component{
    render(){
        return(
            <div className="listImages">
                <ul className="ulImages">
                    <Image showImage="http://www.hetah.net/_assets/modules/traductor/img/c/comida.jpg" />
                </ul>
            </div>
        )
    }
}