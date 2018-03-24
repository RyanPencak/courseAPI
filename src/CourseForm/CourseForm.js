import './CourseForm.css';
import SearchResults from '../SearchResults/SearchResults.js'
import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

export default class CourseForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
      let prof = this.state.searchQueries.professor.substring(6);

      if (ProfessorsList.includes(prof)) {
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
                  <option value="ACFM">ACFM (Acct & Financial Management)</option>
                  <option value="OFFAF">OFFAF (Africa)</option>
                  <option value="AFST">AFST (Africana Studies)</option>
                  <option value="ANBE">ANBE (Animal Behavior)</option>
                  <option value="ANTH">ANTH (Anthropology)</option>
                  <option value="ARBC">ARBC (Arabic)</option>
                  <option value="ARTH">ARTH (Art History)</option>
                  <option value="ARST">ARST (Art Studio)</option>
                  <option value="ASTR">ASTR (Astronomy)</option>
                  <option value="BIOL">BIOL (Biology)</option>
                  <option value="BMEG">BMEG (Biomedical Engineering)</option>
                  <option value="OFFL">OFFL (Bucknell London Semester)</option>
                  <option value="OFFD">OFFD (Bucknell en Espana (Granada))</option>
                  <option value="OFFF">OFFF (Bucknell en France)</option>
                  <option value="OFFAT">OFFAT (Bucknell in Athens)</option>
                  <option value="OFFGH">OFFGH (Bucknell in Ghana)</option>
                  <option value="OFFG">OFFG (Bucknell in Nicaragua)</option>
                  <option value="OFFCB">OFFCB (Caribbean)</option>
                  <option value="CHEG">CHEG (Chemical Engineering)</option>
                  <option value="CHEM">CHEM (Chemistry)</option>
                  <option value="CHIN">CHIN (Chinese)</option>
                  <option value="CEEG">CEEG (Civil & Environmental Engr.)</option>
                  <option value="CLAS">CLAS (Classics)</option>
                  <option value="CSCI">CSCI (Computer Science)</option>
                  <option value="ENCW">ENCW (Creative Writing)</option>
                  <option value="DANC">DANC (Dance)</option>
                  <option value="OFFDN">OFFDN (Denmark Program)</option>
                  <option value="EAST">EAST (East Asian Studies)</option>
                  <option value="ECON">ECON (Economics)</option>
                  <option value="EDUC">EDUC (Education)</option>
                  <option value="ECEG">ECEG (Electrical & Computer Engr.)</option>
                  <option value="ENGR">ENGR (Engineering)</option>
                  <option value="ENGL">ENGL (English)</option>
                  <option value="ENST">ENST (Environmental Studies)</option>
                  <option value="ENFS">ENFS (Film/Media Studies)</option>
                  <option value="FOUN">FOUN (Foundation Seminar)</option>
                  <option value="FREN">FREN (French)</option>
                  <option value="GEOG">GEOG (Geography)</option>
                  <option value="GEOL">GEOL (Geology)</option>
                  <option value="GRMN">GRMN (German)</option>
                  <option value="GLBM">GLBM (Global Management)</option>
                  <option value="GREK">GREK (Greek)</option>
                  <option value="HEBR">HEBR (Hebrew)</option>
                  <option value="HIST">HIST (History)</option>
                  <option value="HUMN">HUMN (Humanities)</option>
                  <option value="IDPT">IDPT (Interdepartmental)</option>
                  <option value="IREL">IREL (International Relations)</option>
                  <option value="ITAL">ITAL (Italian)</option>
                  <option value="OFFJP">OFFJP (Japan)</option>
                  <option value="JAPN">JAPN (Japanese)</option>
                  <option value="LATN">LATN (Latin)</option>
                  <option value="LAMS">LAMS (Latin American Studies)</option>
                  <option value="LEGL">LEGL (Legal Studies)</option>
                  <option value="LING">LING (Linguistics)</option>
                  <option value="ENLS">ENLS (Literary Studies)</option>
                  <option value="MGMT">MGMT (Management)</option>
                  <option value="MSUS">MSUS (Managing for Sustainability)</option>
                  <option value="MIDE">MIDE (Markets, Innovation & Design)</option>
                  <option value="MATH">MATH (Mathematics)</option>
                  <option value="MECH">MECH (Mechanical Engineering)</option>
                  <option value="MILS">MILS (Military Science)</option>
                  <option value="MUSC">MUSC (Music)</option>
                  <option value="NEUR">NEUR (Neuroscience)</option>
                  <option value="OCST">OCST (Off Campus Study)</option>
                  <option value="PHIL">PHIL (Philosophy)</option>
                  <option value="PHYS">PHYS (Physics)</option>
                  <option value="POLS">POLS (Political Science)</option>
                  <option value="PSYC">PSYC (Psychology)</option>
                  <option value="RELI">RELI (Religion)</option>
                  <option value="RESC">RESC (Residential Colleges)</option>
                  <option value="RUSS">RUSS (Russian)</option>
                  <option value="SIGN">SIGN (Sign Language)</option>
                  <option value="SOCI">SOCI (Sociology)</option>
                  <option value="SPAN">SPAN (Spanish)</option>
                  <option value="SLIF">SLIF (Student Life)</option>
                  <option value="THEA">THEA (Theatre)</option>
                  <option value="UNIV">UNIV (University Course)</option>
                  <option value="WMST">WMST (Women's and Gender Studies)</option>
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

              {/* <FormGroup controlId="formInlineDays" onChange={this.handleDaysChange} validationState={this.getDayValidationState()}>
                <ControlLabel>Course Days</ControlLabel>
                <FormControl type="text" placeholder="Days: M, T, W, R, F, MWF, MW, TR" />
              </FormGroup> */}

              <Button type="submit">Search</Button>

            </Form>
          </div>
        : null
        }

        {/* <div className="load"> */}
        {
            ((this.state.loading) && (this.state.selectedCourses.length === 0))
            ?
            <div className="loading">
              <ReactLoading id="load_icon" type='spinningBubbles' color='#003865' height='100px' width='100px' />
              <h3> No Courses Found </h3>
            </div>
            : null
        }
      {/* </div> */}

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

const ProfessorsList = ['abowitz', 'aburdene', 'adams', 'al-huq', 'allen', 'allers', 'altendorf', 'alvarez', 'amthor',
'andersson', 'andrews', 'antonaccio', 'armstrong', 'arslan', 'asare', 'bailey', 'baish', 'baish',
'baker', 'baker', 'balcells', 'bakir', 'baltz', 'banciu', 'banks', 'barba', 'abreu', 'bayar', 'beal',
'bedi', 'beiler', 'beninati', 'benowitz-fredericks', 'bettner', 'bickel', 'blanco', 'bohlen', 'boomer',
'botelho', 'boyatzis', 'boyd', 'brahma', 'breyfogle', 'brooksbank', 'brown-vincent', 'buck', 'co',
'buffinton', 'buffinton', 'buonopane', 'burg', 'campbell', 'camuto', 'capaldi', 'caravan', 'carr',
'cassidy', 'casteel', 'castle', 'cavanagh', '', 'chen', 'chidambaram', 'chen', 'chen', 'cheville',
'chin', 'clapp', 'clingham', 'cole', 'collier', 'congdon', 'cooney', 'councill', 'crago', 'csernica',
'cuñado', 'cyr', 'daepp', 'dalleo', 'daly', 'ii', 'daniel', 'daubman', 'davis', 'davis', 'testa',
'delsandro', 'dexter', 'dick', 'distefano', 'doces', 'dong', 'donner', 'dosemeci', 'drexler', 'dryden',
'dubois', 'dupont', 'durden', 'dutcher', 'ebenstein', 'eber-schmid', 'eisenstein', 'ellis', 'enyeart',
'evans', 'evans', 'exner', 'faden', 'fanaei', 'faull', 'feuerstein', 'field', 'jr.', 'fleming',
'flynn', 'flynt', 'fourshey', 'frey', 'frey', 'fridman', 'fruja', 'gabauer', 'gallagher', 'gallimore',
'garthwaite', 'gasaway', 'gates', 'gazes', 'gholampour', 'gilani', 'gillespie', 'gilmor', 'golightly',
'goodale', 'gorkin', 'gosson', 'grant', 'grant', 'gray', 'griffin', 'griffith', 'grisel', 'groff',
'gruver', 'guattery', 'guerrero', 'guthrie', 'gwin', 'jessi', 'halpern', 'hamid', 'hamlet', 'haussmann',
'lazzarini', 'hays', 'hecock', 'heifetz', 'heinsohn', 'heintzelman', 'hendry', 'henne-ochoa', 'henry',
'henshaw', 'herman', 'higgins', 'hiller', 'hoffman', 'hojati', 'hong', 'hu', 'hunter', 'hutchinson',
'hutton', 'isleem', 'iyer', 'jablonski', 'jacob', 'james', 'jansson', 'jensen', 'jiang', 'jimenez',
'johnson-cramer', 'johnson', 'jones', 'jones', 'jordan', 'judge', 'kabalan', 'kedzior', 'keitel',
'kell', 'kelley', 'kennedy', 'kenny', 'kerber', 'kim', 'king', 'kingué', 'kinnaman', 'kirby', 'knisely',
'knoedler', 'knox', 'kochel', 'kosmin', 'kose', 'koutsoliotas', 'kozick', 'kristjanson-gural', 'krohn',
'krout', 'kuhn', 'ladd', 'langford', 'larson', 'lauer', 'lavine', 'lavine', 'lecky', 'leddington',
'ledford', 'lee', 'lewi', 'ligare', 'lin', 'lintott', 'lira', 'lockard', 'lofgren', 'long', 'lopez',
'lorimor', 'mackenzie-dawson', 'sáez', 'magee', 'malone', 'malusis', 'maneval', 'mann', 'manoogian',
'marchiori', 'marin', 'marsh', 'martin', 'martin', 'martincich', 'martine', 'massaro', 'massoud',
'mastrolia', 'matuszak', 'mazurek', 'mccloskey', 'mccread', 'mcdayter', 'mcgoun', 'mcguire', 'mcguire',
'mckinney', 'mclain', 'mcnabb', 'mcnamara', 'mctammany', 'meinke', 'meiser', 'mena', 'meng', 'milofsky',
'mineart', 'mir', 'miskioglu', 'mitchel', 'mitchell', 'moore', 'mordaunt', 'morin', 'morris', 'morris-keitel',
'mulligan', 'mullaney', 'murray', 'myers', 'myers', 'needham', 'lambert', 'newlin', 'nicholls', 'nickel',
"o'connor", 'okparanta', 'orbison', 'orr', 'paliulis', 'paparcon', 'para', 'pask', 'patiño', 'peck', 'peet',
'penniman', 'perrone', 'perrone', 'peterson', 'piggott', 'pizzorno', 'ponnuswami', 'prince', 'ptacek', 'randall',
'raymond', 'reed', 'reeder', 'regmi', 'rickard', 'riley', 'rogovin', 'rojas', 'rosenberg', 'rothman', 'rovnyak',
'ryan', 'saucier', 'salyards', 'sammells', 'sanjian', 'sanjian', 'santanen', 'scapellato', 'schenck', 'scherr',
'seskir', 'sewell', 'schmidli', 'schneider', 'schweizer', 'searles', 'sewell', 'sharma', '', 'shields', 'shooter',
'siegel', 'siewers', 'sills', 'silva', 'slater', 'sloboda', 'smith', 'smith', 'smith', 'smolka', 'smolleck', 'snyder',
'snyder', 'solomon', 'spiro', 'pierre', 'stanciu', 'stayton', 'steine', 'stevenson', 'stewart', 'jr.', 'stokes-brown',
'stough', 'stowe', 'strein', 'stuhl', 'sulai', 'susman', 'swan', 'switzer', 'takahashi', 'orviz', 'thomas', 'thompson',
'thomson', 'thornley', 'tian', 'tlusty', 'traflet', 'tran', 'tranquillo', 'trego', 'trop', 'turner', 'uçarer', 'ulmer',
'utter', 'vandevender', 'vernengo', 'vigeant', 'vogel', 'vollmayr-lee', 'vollmayr-lee', 'voss', 'wade', 'wakabayashi',
'iii', 'walton-macaulay', 'westbrook', 'wheatley', 'white', 'willer', 'williams', 'williams', 'williams', 'williams',
'willits', 'wilshusen', 'wittie', 'wolaver', 'wooden', 'wright', 'xu', 'xu', 'young', 'young', 'zanon', 'zhu', 'ziemian',
'ziemian', 'zimmerman'];
