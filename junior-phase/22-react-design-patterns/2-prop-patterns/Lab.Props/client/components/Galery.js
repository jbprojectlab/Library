import React, { Component, Children } from "react";

class Galery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: true
    };
  }

  render() {
    const { title, author, children } = this.props;
    return (
      <div className="galery">
        <header onClick={() => this.setState({ opened: !this.state.opened })}>
          {title} by {author} - {Children.count(children)} images
        </header>
        <div className={this.state.opened ? "content" : "content-hidden"}>{children}</div>
      </div>
    );
  }
}

Galery.defaultProps = {
  author: "Anonymous"
};

export default Galery;
