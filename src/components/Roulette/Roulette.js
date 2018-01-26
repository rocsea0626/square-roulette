/**
 * Created by guo_haipeng on 25/01/2018.
 */
import React, {Component} from 'react';
import {Button, Grid, Row, Well} from "react-bootstrap";

class RouletteButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Button bsStyle={this.props.selected ? "warning" : "success"}
                    onClick={this.handleOnToggleClicked}>{this.props.title}</Button>
        )
    }
}

class ToggleButton extends Component {

    constructor(props) {
        super(props)
    }

    handleOnClick = () => {
        this.props.onToggle()
    }

    render() {
        return (
            <Button bsStyle="success"
                    onClick={this.handleOnClick}>{!this.props.toggleState ? this.props.titleFalse : this.props.titleTrue}</Button>
        )
    }
}


export default class Roulette extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: [
                false, false, false,
                false, false, false,
                false, false, false
            ],
            timerId: 0,
            hasStarted: false
        }
    }


    handleOnToggleClicked = () => {
        if (!this.state.hasStarted) {
            this.setState({timerId: this.roll()})
            this.handleOnStarted()
        } else {
            console.log('timerId=', this.state.timerId)
            this.handleOnStopped()
            clearTimeout(this.state.timerId)
        }
    }

    handleOnStarted = () => {
        this.setState({hasStarted: true})
        this.props.onStart()
    }

    handleOnStopped = () => {
        this.setState({hasStarted: false})
        this.props.onStop()
    }

    roll = (delay = 0) => {

        return setTimeout(() => {
            // console.log('roll(delay=%d)', delay)
            if (delay >= 1000) {
                clearTimeout(this.state.timerId)
                this.handleOnStopped()
                this.props.onResult(this.state.selected.findIndex((val)=>{
                    return val===true
                }) + 1)
                return
            }

            let newTrueIdx = Math.floor(Math.random() * 9)
            const newSelected = this.state.selected.slice()
            newSelected.forEach((val, idx) => {
                if (idx === newTrueIdx) {
                    if (val) {
                        newTrueIdx = (newTrueIdx + 1) % this.state.selected.length
                        newSelected[idx] = false
                    } else {
                        newSelected[idx] = true
                    }
                } else {
                    newSelected[idx] = false
                }
            })
            this.setState({
                selected: newSelected
            })


            this.roll(delay + 50)
        }, delay)
    }

    renderButtons = (cols) => {
        const rows = [];
        for (let r = 0; r < cols; r++) {
            rows.push(this.renderRow(r, cols))
        }
        return rows
    }

    renderRow = (row, cols) => {
        const arr = []
        for (let c = 0; c < cols; c++) {
            arr.push(c)
        }
        return (
            <Row key={'row_btn_' + row}>
                {
                    arr.map((val, idx) => {
                        let id = row * cols + val;
                        return <RouletteButton key={'key_btn_' + id} selected={this.state.selected[id]}
                                                                        title={id + 1}/>
                    })
                }
            </Row>
        )
    }

    render() {
        return (
            <div>
                <Well>
                    <Grid>
                        {this.renderButtons(3)}
                    </Grid>
                </Well>
                <Well>
                    <Grid>
                        <Row className="show-grid">
                            <ToggleButton onToggle={this.handleOnToggleClicked} toggleState={this.state.hasStarted} titleFalse="Start" titleTrue="Stop"/>
                            {/*<Button bsStyle="primary" onClick={this.handleOnClickStart}>Start</Button>*/}
                        </Row>
                    </Grid>
                </Well>
            </div>
        )
    }
}