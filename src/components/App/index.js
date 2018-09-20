import React from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';
import ImageList from '../ImageList';
import { BrowserRouter as Router, Route} from 'react-router-dom'
 

export default class App extends React.Component{
    
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={()=>{
                        return(
                            <ImageList />
                        )
                    }} />
                   
                </div>
            </Router>
        )
    }



}