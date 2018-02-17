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
<<<<<<< HEAD
                    <Image showImage={this.state.links} />
=======
                    <Image showImage={this.state.links} imageDefault={"http://www.hetah.net/_assets/modules/traductor/img/conector_espera.jpg"} />
>>>>>>> 486ba5cba189a6025c8f5a1ac7ad857a75926ed4
                </ul>
            </div>
        )
    }
}