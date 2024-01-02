'use client'

import { useState } from 'react';
import styles from "@styles/Home.module.css";

const CampusSelectionPage = () => {
  const [campus, setCampus] = useState('');
  const [schedule, setSchedule] = useState('');
  const [score, setScore] = useState('');
  const [combinedResult, setCombinedResult] = useState('');

  const campusOptionsLevels = {
    'ESL Fundamentals': 'https://ce.mdc.edu/search/publicCourseAdvancedSearch.do?method=doPaginatedSearch&showInternal=false&courseSearch.courseDescriptionKeyword=ESL+Fundamentals&courseSearch.partialCourseNumber=&courseSearch.courseCategoryStringArray=0&courseSearch.sectionSemesterIdString=&courseSearch.deliveryMethodString=&courseSearch.sectionInstructorName=&courseSearch.sectionAccreditingAssociationStringArray=0&courseSearch.sectionDayOfWeekStringArray=0&courseSearch.sectionStartTimeStringArray=0&courseSearch.sectionStartMonthStringArray=0&courseSearch.filterString=all',
    'Intensive English - Level 1': 'https://ce.mdc.edu/search/publicCourseAdvancedSearch.do?method=doPaginatedSearch&showInternal=false&courseSearch.courseDescriptionKeyword=Intensive+English+-+Level+1&courseSearch.partialCourseNumber=&courseSearch.courseCategoryStringArray=0&courseSearch.sectionSemesterIdString=&courseSearch.deliveryMethodString=&courseSearch.sectionInstructorName=&courseSearch.sectionAccreditingAssociationStringArray=0&courseSearch.sectionDayOfWeekStringArray=0&courseSearch.sectionStartTimeStringArray=0&courseSearch.sectionStartMonthStringArray=0&courseSearch.filterString=all',
    'Intensive English - Level 2': 'https://ce.mdc.edu/search/publicCourseAdvancedSearch.do?method=doPaginatedSearch&showInternal=false&courseSearch.courseDescriptionKeyword=Intensive+English+-+Level+2&courseSearch.partialCourseNumber=&courseSearch.courseCategoryStringArray=0&courseSearch.sectionSemesterIdString=&courseSearch.deliveryMethodString=&courseSearch.sectionInstructorName=&courseSearch.sectionAccreditingAssociationStringArray=0&courseSearch.sectionDayOfWeekStringArray=0&courseSearch.sectionStartTimeStringArray=0&courseSearch.sectionStartMonthStringArray=0&courseSearch.filterString=all',
    'Intensive English - Level 3': 'https://ce.mdc.edu/search/publicCourseAdvancedSearch.do?method=doPaginatedSearch&showInternal=false&courseSearch.courseDescriptionKeyword=Intensive+English+-+Level+3&courseSearch.partialCourseNumber=&courseSearch.courseCategoryStringArray=0&courseSearch.sectionSemesterIdString=&courseSearch.deliveryMethodString=&courseSearch.sectionInstructorName=&courseSearch.sectionAccreditingAssociationStringArray=0&courseSearch.sectionDayOfWeekStringArray=0&courseSearch.sectionStartTimeStringArray=0&courseSearch.sectionStartMonthStringArray=0&courseSearch.filterString=all',
    'Intensive English - Level 4': 'https://ce.mdc.edu/search/publicCourseAdvancedSearch.do?method=doPaginatedSearch&showInternal=false&courseSearch.courseDescriptionKeyword=Intensive+English+-+Level+4&courseSearch.partialCourseNumber=&courseSearch.courseCategoryStringArray=0&courseSearch.sectionSemesterIdString=&courseSearch.deliveryMethodString=&courseSearch.sectionInstructorName=&courseSearch.sectionAccreditingAssociationStringArray=0&courseSearch.sectionDayOfWeekStringArray=0&courseSearch.sectionStartTimeStringArray=0&courseSearch.sectionStartMonthStringArray=0&courseSearch.filterString=all',
    'Intensive English - Level 5': 'https://ce.mdc.edu/search/publicCourseAdvancedSearch.do?method=doPaginatedSearch&showInternal=false&courseSearch.courseDescriptionKeyword=Intensive+English+-+Level+5&courseSearch.partialCourseNumber=&courseSearch.courseCategoryStringArray=0&courseSearch.sectionSemesterIdString=&courseSearch.deliveryMethodString=&courseSearch.sectionInstructorName=&courseSearch.sectionAccreditingAssociationStringArray=0&courseSearch.sectionDayOfWeekStringArray=0&courseSearch.sectionStartTimeStringArray=0&courseSearch.sectionStartMonthStringArray=0&courseSearch.filterString=all',
    'Intensive English - Level 6': 'https://ce.mdc.edu/search/publicCourseAdvancedSearch.do?method=doPaginatedSearch&showInternal=false&courseSearch.courseDescriptionKeyword=Intensive+English+-+Level+6&courseSearch.partialCourseNumber=&courseSearch.courseCategoryStringArray=0&courseSearch.sectionSemesterIdString=&courseSearch.deliveryMethodString=&courseSearch.sectionInstructorName=&courseSearch.sectionAccreditingAssociationStringArray=0&courseSearch.sectionDayOfWeekStringArray=0&courseSearch.sectionStartTimeStringArray=0&courseSearch.sectionStartMonthStringArray=0&courseSearch.filterString=all',
    'Fundamental': 'https://ce.mdc.edu/search/publicCourseAdvancedSearch.do?method=doPaginatedSearch&showInternal=false&courseSearch.courseDescriptionKeyword=Fundamental&courseSearch.partialCourseNumber=&courseSearch.courseCategoryStringArray=0&courseSearch.sectionSemesterIdString=&courseSearch.deliveryMethodString=&courseSearch.sectionInstructorName=&courseSearch.sectionAccreditingAssociationStringArray=0&courseSearch.sectionDayOfWeekStringArray=0&courseSearch.sectionStartTimeStringArray=0&courseSearch.sectionStartMonthStringArray=0&courseSearch.filterString=all',
  };

  const handleCampusChange = (e) => {
    setCampus(e.target.value);
    updateCombinedResult(e.target.value, schedule, score);
  };

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
    updateCombinedResult(campus, e.target.value, score);
  };

  const handleScoreChange = (e) => {
    setScore(e.target.value);
    updateCombinedResult(campus, schedule, e.target.value);
  };

  const updateCombinedResult = (selectedCampus, selectedSchedule, selectedScore) => {
    let result = '';
    if (selectedCampus && selectedScore) {
      result = `Campus: ${selectedCampus} - Level: ${selectedScore}`;
      setCombinedResult(result);
    }
  };

  const generateCourseLink = () => {
    if (!combinedResult || !campus) return '';

    if (campusOptionsLevels[score]) {
      return campusOptionsLevels[score];
    }

    return '';
  };

  return (
    <div>
      <h1>Campus & Schedule Selection</h1>
      <div className={`campus-grid ${styles.campusGrid}`}>
        <label>Campus:</label>
        <select value={campus} onChange={handleCampusChange}>
          <option value="">Select Campus</option>
          <option value="Kendall">Kendall</option>
          <option value="North">North</option>
          <option value="Padron">Padron</option>
          <option value="West">West</option>
          <option value="Wolfson">Wolfson</option>
        </select>
      </div>

      <div className={`campus-grid ${styles.campusGrid}`}>
        <label>Schedule:</label>
        <select value={schedule} onChange={handleScheduleChange}>
          <option value="">Select Schedule</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      <div className={`campusOptions ${styles.campusGrid}`}>
        <label>Score:</label>
        <select value={score} onChange={handleScoreChange}>
          <option value="">Select Score</option>
          <option value="ESL Fundamentals">ESL Fundamentals</option>
          <option value="Intensive English - Level 1">Intensive English - Level 1</option>
          <option value="Intensive English - Level 2">Intensive English - Level 2</option>
          <option value="Intensive English - Level 3">Intensive English - Level 3</option>
          <option value="Intensive English - Level 4">Intensive English - Level 4</option>
          <option value="Intensive English - Level 5">Intensive English - Level 5</option>
          <option value="Intensive English - Level 6">Intensive English - Level 6</option>
          <option value="Fundamental">Fundamental</option>
        </select>
      </div>

      <div>
        {combinedResult && (
          <div>
            <h2>Your selection:</h2>
            <h3>{combinedResult}</h3>
            {generateCourseLink() && (
              <a href={generateCourseLink()} target="_blank" rel="noopener noreferrer">
                <button className={`campusSelectButton ${styles.buttonTextSelector}`}>Enroll Here</button>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusSelectionPage;
