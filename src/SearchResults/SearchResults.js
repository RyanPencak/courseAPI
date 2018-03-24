import './SearchResults.css';
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default function SearchResults(props) {

  return (
    <div className="SearchResults">
      {
        props.courses.length !== 0
        ?
          <div className="results">
            <div className="header">
              <h1>Available Courses</h1>
              <Button bsStyle="primary" onClick={() => {props.handleSearchButton()}}><Glyphicon glyph="search" /></Button>
            </div>
            <div className="allCourses">
              {props.courses.map(function(course, i) {
                let courseKey = 'course_'+i;
                // let desc = course.CrseDesc.replace(/['"]+/g, '');
                let isRoom = 0;
                if(course.Room.length > 0) {
                  isRoom = 1;
                }
                let isLab = 0;
                if(course.CrseNum.toUpperCase().includes('L')) {
                  isLab = 1;
                }
                let isRec = 0;
                if(course.CrseNum.toUpperCase().includes('R')) {
                  isRec = 1;
                }

                if(!isLab && !isRec) {
                  return(
                    <div key={courseKey} className='course'>
                      <h4>{course.Course}: {course.Title}</h4>
                      <h4>Meeting Time: {course["Meeting Time"]}</h4>
                      { isRoom
                        ?
                        <h4>Room: {course.Room}</h4>
                        :
                        null
                      }
                      {
                        course.Labs.map(function(lab, j) {
                          let labKey = 'extra'+j;
                          return(
                            <div key={labKey} className='extra'>
                              <h4>{lab.Course}: {lab.Title}</h4>
                              <h4>Meeting Time: {lab["Meeting Time"]}</h4>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
                else {
                  return(null);
                }
              })}
            </div>
          </div>
        :
        null
      }
    </div>
  );
}
