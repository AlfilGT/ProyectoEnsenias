import React from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';
import Image from '../Image'
import annyang from 'annyang'
import writtenNumbers from 'written-number';

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
        if (s.normalize !== undefined) {
            s = s.normalize ("NFKD");
        }
        return s.replace (/[\u0300-\u036F]/g, "");
    }

    numeroALetra(s){
        var vector = s.split(" ");
        var cadenaSinNumeros = [];
        vector.forEach(function(palabra,index) {
            if(!isNaN(palabra)){
                cadenaSinNumeros[index] = writtenNumbers(palabra,{lang:'es'})
            }else{
                cadenaSinNumeros[index] = palabra;
            }
            
        });
        return cadenaSinNumeros.join(" ");
    }

    async peticionPrueba(tag){
        console.log('Preticion prueba')
        var response = await fetch('/api/consulta',{
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({frase:tag})
        })
        var dataRecieved = await response.json();
        console.log("el dato recibido es "+ dataRecieved);

        console.log('state links:');

        console.log(this.state.links);
    }

    componentDidMount(){
        // Para probar
        if (annyang){
            var commands = {
                'hola' :  ()=>{
                    this.state.links.push("http://www.hetah.net/_assets/modules/traductor/img/h/hola.jpg")
                    this.state.links.push("http://www.hetah.net/_assets/modules/traductor/img/b/burro.jpg")
                    this.state.links.push("http://www.hetah.net/_assets/modules/traductor/img/b/burro.jpg")
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
                },
                '*tag' : (tag)=>{
                    tag = this.noTilde(tag);
                    tag = this.numeroALetra(tag);
                    tag = tag.split(' ');
                    this.peticionPrueba(tag);

                    console.log("La palabra: "+tag);
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