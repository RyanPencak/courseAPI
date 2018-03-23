import './SearchResults.css';
import React from 'react';
// import { Grid, Row, Col } from 'react-bootstrap';

export default function SearchResults(props) {

  return (
    <div className="SearchResults">

      <h1>Available Courses</h1>
      {props.courses.map(function(course, i) {
        var courseKey = 'course_'+i;
        // let desc = course.CrseDesc.replace(/['"]+/g, '');
        var isRoom = 0;
        if(course.Room.length > 0) {
          isRoom = 1;
        }
        var hasLab = 0;
        var labs = [];
        if(course.Labs.length > 0) {
          hasLab = 1;
          labs = course.Labs;
        }
        return(
          <div key={courseKey} id='course'>
            <h4>{course.Course}: {course.Title}</h4>
            <h4>Meeting Time: {course["Meeting Time"]}</h4>
            { isRoom
              ?
              <h4>Room: {course.Room}</h4>
              :
              null
            }
            <p>{course.CrseDesc}</p>
          </div>
        )
      })}
    </div>
  );
}
