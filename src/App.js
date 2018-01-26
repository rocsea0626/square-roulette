import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Roulette from './components/Roulette';
import {Jumbotron} from "react-bootstrap";

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            rouletteResult: ''
        }
    }

    onRouletteResult = (result)=> {
        this.setState({
            rouletteResult: result
        })
    }

    onRouletteStart = ()=> {
        this.setState({
            rouletteResult: ''
        })
    }

    onRouletteStop = ()=> {
    }

    renderResult = ()=>{
        if(this.state.rouletteResult){
            return (
                <Jumbotron>
                    <h1>Congrats, you have got a {this.state.rouletteResult}</h1>
                    <p>
                        What is your {this.state.rouletteResult} for
                    </p>
                </Jumbotron>
            )
        }
        return ''
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                {this.renderResult()}
                <Roulette onResult={this.onRouletteResult} onStart={this.onRouletteStart} onStop={this.onRouletteStop}/>

            </div>
        );
    }
}

export default App;
