import React, { Component } from "react";

class searchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      placeHolder: "Taper votre film",
      intervaleBeforeRequest: 1000,
      lockRequest: false
    };
  }
  handleChange(e) {
    this.setState({ searchText: e.target.value });
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-8 input-group">
          <input
            onKeyUp={this.handleChange.bind(this)}
            type="text"
            className="form-control input-lg"
            onChange={this.handleChange.bind(this)}
            placeholder={this.state.placeHolder}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-secondary"
              onClick={this.handleOnClick.bind(this)}
            >
              Go
            </button>
          </span>
        </div>
        {/* <p>{this.state.searchText}</p> */}
      </div>
    );
  }
  handleChange(event) {
    this.setState({ searchText: event.target.value });
    if (!this.state.lockRequest) {
      this.setState({ lockRequest: true });
      setTimeout(
        function() {
          this.search();
        }.bind(this),
        this.state.intervaleBeforeRequest
      );
    }
  }
  handleOnClick(event) {
    this.search();
  }
  search() {
    this.props.callback(this.state.searchText);
    this.setState({ lockRequest: false });
  }
}

export default searchBar;
