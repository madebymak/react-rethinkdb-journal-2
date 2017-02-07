import React, { Component } from 'react';
import './create.css';
import Slider from 'material-ui/Slider';
import Button from 'react-bootstrap/lib/button';

class CreateEntries extends Component {
  constructor(props, context) {
  super(props, context);
  this.state = {
    slider: 0,
    text: ""
  };
}

  handleSecondSlider(event, value) {
    this.setState({slider: value});
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  }

  handleCreate(event) {
    event.preventDefault();
    let textInput = this.refs.message.value;
    let happinessInput = this.state.slider;
    let sentimentScore = textInput.split(" ").length * happinessInput;
    this.props.handleSubmit(textInput, happinessInput, sentimentScore);
    this.setState({text: ""});
  }

  render() {

    return (
      <div>
        <form ref="journal">
          <p><textarea className="text-box" ref="message" value={this.state.text} placeholder="Tell me about your day." onChange={this.handleChange.bind(this)}>
          </textarea></p>
          <h2>How happy do you feel today?</h2>
          <h3>{this.state.slider}</h3>
          <Slider min={-10} max={10} defaultValue={0} step={1} value={this.state.slider} onChange={this.handleSecondSlider.bind(this)} />
          <Button bsSize="large" disabled={!this.state.text} onClick={ this.handleCreate.bind(this)}>Submit</Button>
        </form>
      </div>
    );
  }
}

export default CreateEntries ;
