import React from 'react';
import ReactDOM from 'react-dom';

const Topping = props => {
  const isSelected = props.type === props.selectedTopping;
  return (
    <div
      className={isSelected ? 'selected' : ''}
      onClick={() => {
        props.chooseTopping(props.type);
      }}>
      {props.type}
    </div>
  );
};

class ToppingList extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedTopping: 'cheese'
    };
    // this.handleChooseTopping = this.handleChooseTopping.bind(this);
  }
  // handleChooseTopping (toppingName) {
  //   this.setState({
  //     selectedTopping: toppingName
  //   });
  // }
  // inside a class method definition, you can use an arrow function so that the `this` will alwalys be the class instance (instead of .bind)
  handleChooseTopping = (toppingName) => {
    this.setState({
      selectedTopping: toppingName
    });
  }
  render () {
    return (
      <div>
        <h1>Your favorite topping is: {this.state.selectedTopping}</h1>
        <ul>
          <Topping
            type='cheese'
            selectedTopping={this.state.selectedTopping}
            chooseTopping={this.handleChooseTopping} />
          <Topping
            type='broccoli'
            selectedTopping={this.state.selectedTopping}
            chooseTopping={this.handleChooseTopping} />
          <Topping
            type='anchovies'
            selectedTopping={this.state.selectedTopping}
            chooseTopping={this.handleChooseTopping} />
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <ToppingList />,
  document.getElementById('main')
);
