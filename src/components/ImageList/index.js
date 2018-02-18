import React from 'react';
import ReactDOM from 'react-dom';
import Image from '../Image'
import annyang from 'annyang'
import writtenNumbers from 'written-number'

export default class ImageList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            links : []
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

    noTilde (s) { // Eliminar tildes y ñ 
        s = s.toLowerCase();
        if (s.normalize != undefined) {
            s = s.normalize ("NFKD");
        }
        return s.replace (/[\u0300-\u036F]/g, "");
    }

    componentDidMount(){
        if (annyang){
            var commands = {
                '*tag' : (tag)=>{
                    console.log(writtenNumbers(tag,{lang:'es'}) +" asdasd");
                },
                'hola' :  ()=>{
                    this.state.links.push("http://www.hetah.net/_assets/modules/traductor/img/h/hola.jpg")
                    this.setState({
                        links : this.state.links
                    })
                },
                'burro' :  ()=>{
                    this.state.links.push("http://www.hetah.net/_assets/modules/traductor/img/b/burro.jpg")
                    this.setState({
                        links : this.state.links
                    })
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