import React from 'react';
import ReactDOM from 'react-dom';
import Image from '../Image'

export default class ImageList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            links : [
                "http://www.hetah.net/_assets/modules/traductor/img/c/comida.jpg",
                "http://www.hetah.net/_assets/modules/traductor/img/c/casa.jpg",
                "http://www.hetah.net/_assets/modules/traductor/img/c/carro.jpg",
                "http://www.hetah.net/_assets/modules/traductor/img/a/ala.jpg",
                "http://www.hetah.net/_assets/modules/traductor/img/b/burro.jpg",
                "http://www.hetah.net/_assets/modules/traductor/img/p/persona.jpg",
                "http://www.hetah.net/_assets/modules/traductor/img/i/iman.jpg"
            ]
        }
    }

    render(){
        return(
            <div className="listImages">
                <ul className="ulImages">
                    <Image showImage={this.state.links} />
                </ul>
            </div>
        )
    }
}