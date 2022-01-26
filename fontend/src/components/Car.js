import React from "react";

// stateFull

class Wheel extends React.Component{

    render(){
        return <>I have 4 wheels.</>;
    }
}

class Car extends React.Component{
    constructor(props){
      super(props);
      this.state = {brand:"Toyota"};
    }
  
changeBrand = (msg) => {
    this.setState({brand:"Mazda"});
    alert(msg);
}

    render(){
      return (
        <>
        <Wheel/>
        <p>My name is <span>{this.state.brand}</span>,{this.props.age}
          <br/>
          Eye color is {this.props.eye}
        </p>
        <button onClick={() => this.changeBrand("Hi !!")}>Click Me !!</button>
        </>
      );
    }
  }

  export default Car;