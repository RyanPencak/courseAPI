import './CourseForm.css';
import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

export default class CourseForm extends Component {

  constructor() {
    super();

    this.state = {
      courseData: [],
      selectedCourses: [],
      year: '',
      semester: '',
      department: '',
      days: '',
      professor: ''
    };

    this.getAllCourses = this.getAllCourses.bind(this);
    this.getSearchCourses = this.getSearchCourses.bind(this);
    this.getDayValidationState = this.getDayValidationState.bind(this);
    this.getProfessorValidationState = this.getProfessorValidationState.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSemesterChange = this.handleSemesterChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleProfessorChange = this.handleProfessorChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
  }

  componentDidMount() {
    this.getAllCourses();
  }

  getAllCourses() {
    fetch('http://eg.bucknell.edu:48484/q?limit=99999')
      .then( res => {
        res.json()
          .then( data => {
            this.setState({
              courseData: data
            });
            // console.log(this.state.courseData);
          })
          .catch()

      })
      .catch (error => console.log("ERROR"+error))
  }

  getSearchCourses() {
    if(this.state.professor === '') {
      fetch(`http://eg.bucknell.edu:48484/q?limit=99999&Year=${this.state.year}&Semester=${this.state.semester}&Department=${this.state.department}`)
        .then( res => {
          res.json()
          .then( data => {
            this.setState({
              selectedCourses: data
            });
            // console.log(this.state.selectedCourses);
          })
          .catch()
        })
        .catch (error => console.log("ERROR"+error))
    }
    else {
      fetch(`http://eg.bucknell.edu:48484/q?limit=99999&Year=${this.state.year}&Semester=${this.state.semester}&Department=${this.state.department}&text=${this.state.professor}`)
        .then( res => {
          res.json()
          .then( data => {
            this.setState({
              selectedCourses: data
            });
          })
          .catch()
        })
        .catch (error => console.log("ERROR"+error))
    }
  }

  handleYearChange(e) {
    this.setState({ year: e.target.value });
  }

  handleSemesterChange(e) {
    this.setState({ semester: e.target.value });
  }

  handleDepartmentChange(e) {
    this.setState({ department: e.target.value });
  }

  handleProfessorChange(e) {
    this.setState({ professor: e.target.value });
  }

  handleDaysChange(e) {
    this.setState({ days: e.target.value });
  }

  getDayValidationState() {
    const days = this.state.days.toUpperCase();
    const length = this.state.days.length;
    if (days === 'M' || days === 'T' || days === 'W' || days === 'H' || days === 'F' || days === 'MWF' || days === 'MW' || days === 'TH') {
      return 'success';
    }
    else if (length === 0){
      return null
    }
    else {
      return 'error';
    }
  }

  getProfessorValidationState() {
    const prof = this.state.professor.toLowerCase();
    // const length = this.state.professor.length;
    if (prof === 'baish' || prof === 'bedi' || prof === 'dancy' || prof === 'guattery' ||
    prof === 'hamid' || prof === 'king' || prof === 'marchiori' || prof === 'mir' ||
    prof === 'meng' || prof === 'peck' || prof === 'ritter' || prof === 'scherr' || prof === 'stough' ||
    prof === 'wittie' || prof === 'emeriti') {
      return 'success';
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <div className="courseForm">
        <Form>
          <FormGroup controlId="formSelectYear" onChange={this.handleYearChange}>
            <ControlLabel>Year</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formSelectSemester" onChange={this.handleSemesterChange}>
            <ControlLabel>Semester</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formSelectDepartment" onChange={this.handleDepartmentChange}>
            <ControlLabel>Department</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="CSCI">CSCI (Computer Science)</option>
              <option value="ECEG">ECEG (Electrical Engineering)</option>
              <option value="ECON">ECON (Economics)</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formInlineDays" onChange={this.handleProfessorChange} validationState={this.getProfessorValidationState()}>
            <ControlLabel>Professor</ControlLabel>
            <FormControl type="text" placeholder="Professor Last Name" />
          </FormGroup>

          <FormGroup controlId="formInlineDays" onChange={this.handleDaysChange} validationState={this.getDayValidationState()}>
            <ControlLabel>Course Days</ControlLabel>
            <FormControl type="text" placeholder="Enter M, T, W, H, F, MWF, ..." />
          </FormGroup>

          <Button type="submit" onClick={this.getSearchCourses()}>Search</Button>

        </Form>
      </div>
    );
  }
}
