import React, { Component } from "react";
import TableItem from "./components/TableItem";
import Form from "./components/Form";
import axios from "axios";
import "./App.css";
import OrderDetail from "./components/OrderDetail";

class App extends Component {
  state = {
    parts: [],
    orders: [],
    partsTab: true,
    ordersTab: false,
  };

  componentDidMount() {
    this.getAllParts();
    this.getOrderDetail();
  }

  getAllParts = async () => {
    await axios
      .get(
        "https://us-central1-cloudprojects-279901.cloudfunctions.net/companyy/parts"
      )
      .then((res) => {
        this.setState({
          parts: res.data,
        });
      });
  };

  getOrderDetail = async () => {
    await axios
      .get(
        "https://us-central1-cloudprojects-279901.cloudfunctions.net/companyy/order"
      )
      .then((res) => {
        this.setState({
          orders: res.data,
        });
      });
  };

  renderList = () => {
    return this.state.parts.map((item) => (
      <TableItem key={item.partId} item={item} />
    ));
  };

  orderDetail = () => {
    return this.state.orders.map((item, index) => (
      <OrderDetail key={index} item={item} />
    ));
  };

  changePartsTab = () => {
    this.setState({
      partsTab: true,
      ordersTab: false,
    });
    this.getAllParts();
  };

  changeOrdersTab = () => {
    this.setState({
      partsTab: false,
      ordersTab: true,
    });
    this.getOrderDetail();
  };

  render() {
    const { partsTab, ordersTab } = this.state;
    return (
      <div className="ui container">
        <h1 className="ui header">Company Y</h1>
        <div className="ui section divider"></div>
        <div className="ui grid">
          <div className="row">
            <div className="twelve wide column">
              <div className="ui top attached tabular menu">
                <span
                  onClick={this.changePartsTab}
                  className={partsTab ? "item active" : "item"}
                  data-tab="first"
                >
                  Parts
                </span>
                <span
                  onClick={this.changeOrdersTab}
                  className={ordersTab ? "item active" : "item"}
                  data-tab="second"
                >
                  PartsOrders
                </span>
              </div>
              <div
                className={
                  partsTab
                    ? "ui bottom attached tab segment active"
                    : "ui bottom attached tab segment"
                }
                data-tab="first"
              >
                <table className="ui single line table">
                  <thead>
                    <tr>
                      <th>Part Id</th>
                      <th>Part Name</th>
                      <th>Quantity On Hand</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderList()}</tbody>
                </table>
              </div>
              <div
                className={
                  ordersTab
                    ? "ui bottom attached tab segment active"
                    : "ui bottom attached tab segment"
                }
                data-tab="second"
              >
                <table className="ui single line table">
                  <thead>
                    <tr>
                      <th>Part Id</th>
                      <th>Job Name</th>
                      <th>User Id</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>{this.orderDetail()}</tbody>
                </table>
              </div>
            </div>
            <div className="four wide column">
              <Form getAllParts={this.getAllParts} usage="create" />
              <div className="ui section divider"></div>
              <Form getAllParts={this.getAllParts} usage="update" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
