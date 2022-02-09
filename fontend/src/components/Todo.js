import React from "react";
import {Button} from "react-bootstrap";
import './styles/Todolist.css';

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  removeItem(id) {
    fetch(`http://localhost:8081/item/del/${id}`).then(
      this.setState({
        items: this.state.items.filter((item) => item.id !== id),
      })
    );
  }

  toggleDone(id) {
    let items = [...this.state.items];
    let item = items.find((item) => item.id === id);
    item.done = !item.done;

    fetch(`http://localhost:8081/item/upd/${id}/${item.done}`).then(
      this.setState({ items })
    );
  }

  isDone(done) {
    if (done) {
      return "Done";
    } else {
      return "Not Done";
    }
  }

  createItem(item) {
    return (
      <div className="ListItem" key={item.id} id={item.id}>
        <div className="Title">
          <div className="RemoveItem" onClick={() => this.removeItem(item.id)}>
            <Button className="btn btn-primary">x</Button>
          </div>
          {item.item}
        </div>
        <div className="Status" onClick={() => this.toggleDone(item.id)}>
          {this.isDone(item.done)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch("http://localhost:8081/items")
      .then((res) => res.json())
      .then((json) => this.setState({ items: json.items }));
  }

  render() {
    var items = this.state.items;
    return (
      <div className="TodoList">
        <div className="List">{items.map((item) => this.createItem(item))}</div>
      </div>
    );
  }
}

export default Todolist;