import React, { Component } from 'react';
import Header from '../Header/Header.js'
import CourseForm from '../CourseForm/CourseForm.js'
// import CourseSearch from '../CourseSearch/CourseSearch.js';

class App extends Component {

  componentDidMount() {
    document.title = "Course Search"
  }

  render() {
    return (
      <div className="App">
        <Header />
        <CourseForm />
        {/* <CourseSearch /> */}
      </div>
    );
  }
}

export default App;
