import './CourseForm.css';
// import AllProfessors from './Data.js';
import SearchResults from '../SearchResults/SearchResults.js'
import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

export default class CourseForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allDepartments: ['ACFM','OFFAF','AFST','ANBE','ANTH','ARBC','ARTH','ARST'],
      selectedCourses: [],
      searchDisplayed: true,
      loading: false,
      searchQueries: {
        professor: null
      }
    };

    // this.getAllCourses = this.getAllCourses.bind(this);
    // this.getDepartmentValidationState = this.getDepartmentValidationState.bind(this);
    // this.getDayValidationState = this.getDayValidationState.bind(this);
    this.getSearchCourses = this.getSearchCourses.bind(this);
    this.getProfessorValidationState = this.getProfessorValidationState.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSemesterChange = this.handleSemesterChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleProfessorChange = this.handleProfessorChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);

  }

  // componentDidMount() {
    // this.setState({courseData: this.getAllCourses()});
    // this.setState({professorList: AllProfessors})
  // }

  // getAllCourses() {
  //   fetch('https://www.eg.bucknell.edu/~amm042/service/q?limit=99999')
  //     .then( res => {
  //       res.json()
  //         .then( data => {
  //           this.setState({
  //             courseData: data.message
  //           });
  //         })
  //         .catch()
  //
  //     })
  //     .catch (error => console.log("ERROR"+error))
  // }

  getSearchCourses() {
    let url = 'https://www.eg.bucknell.edu/~amm042/service/q?limit=99999';
    const queries = this.state.searchQueries;
    for(const key in queries) {
      // console.log(queries[key]);
      if(queries[key]) {
        let q = queries[key];
        url += q;
      }
    }
    // console.log(url);

    fetch(url)
    .then( res => {
      res.json()
      .then( data => {
        this.setState({
          selectedCourses: data.message
        });
        // console.log(this.state.selectedCourses);
      })
      .catch()
    })
    .catch (error => console.log("ERROR"+error))
  }

  handleYearChange(e) {
    if(e.target.value === 'select') {
      this.setState({
        searchQueries: {
          year: null,
          semester: this.state.searchQueries.semester,
          department: this.state.searchQueries.department,
          professor: this.state.searchQueries.professor
        }
      });
    }
    else {
      this.setState({
        searchQueries: {
          year: `&Year=${e.target.value}`,
          semester: this.state.searchQueries.semester,
          department: this.state.searchQueries.department,
          professor: this.state.searchQueries.professor
        }
      });
    }
  }

  handleSemesterChange(e) {
    if(e.target.value === 'select') {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester: null,
          department: this.state.searchQueries.department,
          professor: this.state.searchQueries.professor
        }
      });
    }
    else {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester: `&Semester=${e.target.value}`,
          department: this.state.searchQueries.department,
          professor: this.state.searchQueries.professor
        }
      });
    }
  }

  handleDepartmentChange(e) {
    // console.log(this.state.professorList);
    if(e.target.value === 'select') {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester: this.state.searchQueries.year,
          department: null,
          professor: this.state.searchQueries.professor
        }
      });
    }
    else {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester: this.state.searchQueries.year,
          department: `&Department=${e.target.value}`,
          professor: this.state.searchQueries.professor
        }
      });
    }
  }

  handleProfessorChange(e) {
    if(e.target.value.length === 0) {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester: this.state.searchQueries.year,
          department: this.state.searchQueries.department,
          professor: null
        }
      });
    }
    else {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester: this.state.searchQueries.year,
          department: this.state.searchQueries.department,
          professor: `&text=${e.target.value}`
        }
      });
    }
  }

  handleDaysChange(e) {
    this.setState({ days: e.target.value });
  }

  // getDepartmentValidationState() {
  //   const dept = this.state.department.toUpperCase();
  //   const length = this.state.days.length;
  //   if (this.state.allDepartments.includes(dept)) {
  //     return 'success';
  //   }
  //   else if (length === 0){
  //     return null
  //   }
  //   else {
  //     return 'error';
  //   }
  // }

  // getDayValidationState() {
  //   const days = this.state.days.toUpperCase();
  //   const length = this.state.days.length;
  //   if (days === 'M' || days === 'T' || days === 'W' || days === 'R' || days === 'F' || days === 'MWF' || days === 'MW' || days === 'TH') {
  //     return 'success';
  //   }
  //   else if (length === 0){
  //     return null
  //   }
  //   else {
  //     return 'error';
  //   }
  // }

  getProfessorValidationState() {
    if(this.state.searchQueries.professor && this.state.searchQueries.professor.substring(6)) {
      let prof = this.state.searchQueries.professor.substring(6).toLowerCase();
      // let profList = this.state.ProfessorsList.toLowerCase();
      if(prof === 'baish' || prof === 'bedi' || prof === 'dancy' || prof === 'guattery' ||
      prof === 'hamid' || prof === 'king' || prof === 'marchiori' || prof === 'mir' ||
      prof === 'meng' || prof === 'peck' || prof === 'ritter' || prof === 'scherr' || prof === 'stough' ||
      prof === 'wittie') {
      // if(AllProfessors.indexOf(prof) > -1) {
        return 'success';
      }
      else {
        return null;
      }
    }
    // const dept = this.state.searchQueries.department.toUpperCase();
    // if(dept === 'CSCI') {
    //   if(prof === 'baish' || prof === 'bedi' || prof === 'dancy' || prof === 'guattery' ||
    //   prof === 'hamid' || prof === 'king' || prof === 'marchiori' || prof === 'mir' ||
    //   prof === 'meng' || prof === 'peck' || prof === 'ritter' || prof === 'scherr' || prof === 'stough' ||
    //   prof === 'wittie' || prof === 'emeriti') {
    //     return 'success';
    //   }
    //   else {
    //     return null;
    //   }
    // }
    // else if(this.state.department === 'ECEG') {
    //   if(prof === 'baish' || prof === 'bedi' || prof === 'dancy' || prof === 'guattery' ||
    //   prof === 'hamid' || prof === 'king' || prof === 'marchiori' || prof === 'mir' ||
    //   prof === 'meng' || prof === 'peck' || prof === 'ritter' || prof === 'scherr' || prof === 'stough' ||
    //   prof === 'wittie' || prof === 'emeriti') {
    //     return 'success';
    //   }
    //   else {
    //     return null;
    //   }
    // }
    // else {
    //   return null;
    // }
    // for(var i=0; i<departmentInfo.length; i++) {
    //   if((departmentInfo[i].name === this.state.department.toUpperCase()) && (departmentInfo[i].professors.includes(this.state.professor.toLowerCase()))) {
    //     return 'success';
    //   }
    //   else {
    //     return null;
    //   }
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      searchDisplayed: false,
      loading: true
    });
    this.getSearchCourses();
  }

  handleSearchButton() {
    this.setState({
      searchQueries: {},
      selectedCourses: [],
      searchDisplayed: true,
      loading: false
    })
  }

  render() {
    return (
      <div className="CourseForm">
        {this.state.searchDisplayed
        ?
          <div className="form">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup controlId="formSelectYear">
                <ControlLabel>Year</ControlLabel>
                <FormControl componentClass="select" placeholder="select" onChange={this.handleYearChange}>
                  <option value="select"></option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                </FormControl>
              </FormGroup>

              <FormGroup controlId="formSelectSemester" onChange={this.handleSemesterChange}>
                <ControlLabel>Semester</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select"></option>
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                </FormControl>
              </FormGroup>

              <FormGroup controlId="formSelectDepartment" onChange={this.handleDepartmentChange}>
                <ControlLabel>Department</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select"></option>
                  <option value="ACFM">ACFM</option>
                  <option value="CSCI">CSCI</option>
                  <option value="ECEG">ECEG</option>
                  <option value="ECON">ECON</option>
                </FormControl>
              </FormGroup>

              {/* <FormGroup controlId="formInlineDays" onChange={this.handleDepartmentChange} validationState={this.getDepartmentValidationState()}>
              <ControlLabel>Department</ControlLabel>
              <FormControl type="text" placeholder="Department: ACFM, CSCI, etc." />
            </FormGroup> */}

              <FormGroup controlId="formInlineDays" onChange={this.handleProfessorChange} validationState={this.getProfessorValidationState()}>
                <ControlLabel>Professor</ControlLabel>
                <FormControl type="text" placeholder="Professor Last Name" />
              </FormGroup>

              <FormGroup controlId="formInlineDays" onChange={this.handleDaysChange} /*validationState={this.getDayValidationState()}*/>
                <ControlLabel>Course Days</ControlLabel>
                <FormControl type="text" placeholder="Days: M, T, W, R, F, MWF, MW, TR" />
              </FormGroup>

              <Button type="submit">Search</Button>

            </Form>
          </div>
        : null
        }

        {
          ((this.state.loading) && (this.state.selectedCourses.length === 0))
          ?
          <ReactLoading type='spinningBubbles' color='#fc0202' height='100px' width='100px' />
          : null
        }

        {
          this.state.selectedCourses.length !== 0
          ?
          <SearchResults
            courses={this.state.selectedCourses}
            handleSearchButton={this.handleSearchButton}
          />
          : null
        }
      </div>
    );
  }
}
