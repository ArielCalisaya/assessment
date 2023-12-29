'use client'

import CampusSelectionBeginner from "src/components/campusSelectionBeginner";
import CampusSelectionIntermediate from "src/components/CampusSelectionIntermediate";
import CampusSelectionAdvanced from "src/components/campusSelectionAdvanced";
import { useState } from 'react';
import styles from "@styles/Home.module.css";


const CampusSelectionPage = () => {
  const [campus, setCampus] = useState('');
  const [schedule, setSchedule] = useState('');
  const [score, setScore] = useState('');
  const [combinedResult, setCombinedResult] = useState('');

  const campusOptionsBeginners = [
    { name: "Kendall", courseId: [1154898] },
    { name: "North", courseId: [1166381] },
    { name: "Padron", courseId: [1171964] },
    { name: "West", courseId: [1171211] },
    { name: "Wolfson", courseId: [1020914] },
  ];

  const campusOptionsIntermediate = [
    { name: "Kendall", courseId: [1020369] },
    { name: "North", courseId: [1166435] },
    { name: "Padron", courseId: [1171977] },
    { name: "West", courseId: [1171258] },
    { name: "Wolfson", courseId: [1161205] },
  ];

  const campusOptionsAdvanced = [
    { name: "Kendall", courseId: [1154969] },
    { name: "North", courseId: [1166445] },
    { name: "Padron", courseId: [1171998] },
    { name: "West", courseId: [1171294] },
    { name: "Wolfson", courseId: [1161210] },
  ];

  const courseUrl = "https://ce.mdc.edu/search/publicCourseSearchDetails.do?method=load&courseId=";

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

    const campusOptions = getCampusOptionsForScore(score);
    const campusInfo = campusOptions.find((option) => option.name === campus);
    if (!campusInfo) return '';

    const courseId = campusInfo.courseId[0];
    return `${courseUrl}${courseId}`;
  };

  const getCampusOptionsForScore = (selectedScore) => {
    switch (selectedScore) {
      case 'Beginner':
        return campusOptionsBeginners;
      case 'Intermediate':
        return campusOptionsIntermediate;
      case 'Advanced':
        return campusOptionsAdvanced;
      default:
        return [];
    }
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
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {combinedResult && (
        <div className={`campus-grid ${styles.campusGrid}`}>
          <h2>Your selection:</h2>
          <h3>{combinedResult}</h3>
          <a href={generateCourseLink()} target="_blank" rel="noopener noreferrer">
            <button className={`campusSelectButton ${styles.buttonTextSelector}`}>Enroll Here</button>
          </a>
        </div>
      )}

      <h1>Campus Beginners</h1>
      <CampusSelectionBeginner />

      <h1>Campus Intermediate</h1>
      <CampusSelectionIntermediate />

      <h1>Campus Advanced</h1>
      <CampusSelectionAdvanced />
    </div>
  );
};

export default CampusSelectionPage;      