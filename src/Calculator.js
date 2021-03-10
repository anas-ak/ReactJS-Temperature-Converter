import React from 'react';

// We will start with a component called BoilingVerdict.
// It accepts the celcius temperature as a prop, and prints whether it is enough to boil water.

function BoilingVerdict(props) {
    if(props.celcius >= 99.9999) {
        return <p>Water Begins To Boil</p>
    }
    return <p>Water Won't Boil</p>
}

// Next we will create a component called Calculator.
// It renders an <input> that lets you enter the temperature, and keeps its value in this.state.temperature
// Additionally, it renders the BoilingVerdict for the current input value.

// Our second requirement is that in addition to a Celcius input, we provide a Fahrenheit input
// and they are kept in sync..

// We can start by extracting a "TemperatureInput" component from Calculator.
// We will add a new "scale" prop to it that can either be a "c" or "f"

const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
};


// Step 2
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {temperature: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        // Declare and set a variable "temperature" as this.state.temperature
        //const temperature = this.state.temperature;

        // Step 5 - Replace thi.state.temperature with this.props.temperature
        // We have removed the local state from this component
        const temperature = this.props.temperature;

        // Declare and set a variable "scale" as this.state.scale
        // const scale = this.state.scale;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}: </legend>
                <input 
                    value= {temperature}
                    onChange={this.handleChange} />
                {/* <BoilingVerdict celsius = {parseFloat(temperature)} /> */}
            </fieldset>
        );
    }
}

// Step 3
// We'll now write two converter functions to convert from Celsius to Fahrenheit, and back
// These 2 functions convert numbers. 

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5/9);
}

function toFahrenheit(celsius) {
    return (celsius)*(9/5) + 32;
}


// Step 4
// We'll write another function "tryConvert" that takes a string "temperature" and a converter function 
// as arguments and returns a string. We will use it to calculate the value of 
// one input, based on the other input

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    
    // input validation
    if(Number.isNaN(input)) {
        return '';
    }

    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}


// We can now change the "Calculator" to render two separate temperature units. 

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  temperature: '', scale: 'c' };
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }

    // Step 6
    // It is enough to store the value of the most recently changed input, and the scale that it represents.
    // We can then infer the value of the other input based on the current "temperature" and "scale" alone.
    // The inputs stay in sync because their values are computed from the same state.

    // Celsius event handler
    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    // Fahrenheit event handler
    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {

        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput 
                    scale = "c" 
                    temperature = {celsius}
                    onTemperatureChange = {this.handleCelsiusChange} />
                
                <TemperatureInput 
                    scale="f" 
                    temperature = {fahrenheit}
                    onTemperatureChange = {this.handleFahrenheitChange} />

                <BoilingVerdict 
                    celcius={parseFloat(celsius)} />
            </div>
        );
    }
}

