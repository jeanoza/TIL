import React, { Component } from "react";

export default class Counter extends Component {
  state = {
    number: 0,
  };
  handlePlus = () => {
    this.setState({ number: this.state.number + 1 });
  };
  handleMinus = () => {
    this.setState({ number: this.state.number - 1 });
  };
  render() {
    return (
      <div>
        <h2>{this.state.number}</h2>
        <button onClick={this.handlePlus}>+1</button>
        <button onClick={this.handleMinus}>-1</button>
      </div>
    );
  }
}
