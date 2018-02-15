import React from 'react';
import ReactDOM from 'react-dom';
import Image from '../Image'

export default class ImageList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            links : [
                "http://hetah.net/_assets/modules/traductor/img/b/bienvenido.jpg",
                "http://hetah.net/_assets/modules/traductor/img/u/universidad.jpg",
                "http://hetah.net/_assets/modules/traductor/img/alfabeto/d.jpg",
                "http://hetah.net/_assets/modules/traductor/img/alfabeto/e.jpg",
                "http://hetah.net/_assets/modules/traductor/img/alfabeto/l.jpg",
                "http://hetah.net/_assets/modules/traductor/img/m/magdalena.jpg"
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