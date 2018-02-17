import React from 'react';
import ReactDOM from 'react-dom';
import Image from '../Image'
import annyang from 'annyang'

export default class ImageList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            links : [

            ]
        }
    }

    render(){
        return(
            <div className="listImages">
                <ul className="ulImages">
                    <Image showImage={this.state.links} imageDefault={"http://www.hetah.net/_assets/modules/traductor/img/conector_espera.jpg"} />
                </ul>
            </div>
        )
    }

    componentDidMount(){
        if (annyang){
            var commands = {
                'hola' :  ()=>{
                    this.state.links.push("http://www.hetah.net/_assets/modules/traductor/img/h/hola.jpg")
                },
                'burro' :  ()=>{
                    this.state.links.push("http://www.hetah.net/_assets/modules/traductor/img/b/burro.jpg")
                }
            }
            
            annyang.setLanguage('es-CO');
            annyang.addCommands(commands)
            annyang.debug();
            annyang.start({
                continuous : false
            });
        }
    }
}