import React, { Component } from 'react';
import CourseSearch from '../CourseSearch/CourseSearch.js';

class App extends Component {

  componentDidMount() {
    document.title = "Course Search"
  }

  render() {
    return (
      <div className="App">
        <CourseSearch />
      </div>
    );
  }
}

export default App;
