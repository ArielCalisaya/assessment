'use client'

import CampusSelectionBeginner from "src/components/campusSelectionBeginner";
import CampusSelectionIntermediate from "src/components/CampusSelectionIntermediate";
import CampusSelectionAdvanced from "src/components/campusSelectionAdvanced";
import CampusSelection from "src/components/campusSelection";

const CampusPage = () => {
  return (
    <div>
      <h1>Campus Page</h1>
      <h2>Choose your campus before continuing to the next step</h2>

      <h1>Campus Todo Junto</h1>
      <CampusSelection />

      <h1>Campus Beginners</h1>
      <CampusSelectionBeginner />

      <h1>Campus Intermediate</h1>
      <CampusSelectionIntermediate />

      <h1>Campus Advanced</h1>
      <CampusSelectionAdvanced />
    </div>
  );
};

export default CampusPage;
