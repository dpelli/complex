import React, { Component } from 'react';
import './Fib.css';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index,
    });
    this.setState({ index: '' });

    await this.fetchValues();
    await this.fetchIndexes();
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key}, I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Enter a number:</h1>
          <input
            type="text"
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button type="submit">Submit</button>
        </form>

        {/* <table>
          <tr>
            <th>Indexes</th>
            <th>Calculated Values</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
          </tr>
        </table> */}

        <h1>Numbers I've seen:</h1>
        <h3>{this.renderSeenIndexes()}</h3>

        <h1>Calculated Values:</h1>
        <h3>{this.renderValues()}</h3>
      </div>
    );
  }
}

export default Fib;
