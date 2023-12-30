import { useState } from "react";
import Link from "next/link";
import styles from "@styles/Home.module.css";

const CampusSelection = ({ onSelectCampus }) => {
    const [selectedCampus, setSelectedCampus] = useState(null);
    const campusOptions = [
        { name: "Kendall", courseIds: [1154898, 1020369, 1154969] },
        { name: "North", courseIds: [1166381, 1166435, 1166445] },
        { name: "Padron", courseIds: [1171964, 1171977, 1171998] },
        { name: "West", courseIds: [1171211, 1171258, 1171294] },
        { name: "Wolfson", courseIds: [1020914, 1161205, 1161210] },
        // ... first IDs: beginners; second: intermediate; third: advanced
    ];

    const generateCourseLink = (courseId) =>
        `https://ce.mdc.edu/search/publicCourseSearchDetails.do?method=load&courseId=${courseId}`;

    const handleCampusSelection = (campus) => {
        setSelectedCampus(campus);
        onSelectCampus(campus);
    };

    return (
        <div className={styles.campusSelection}>
            <div className={`campus-grid ${styles.campusGrid}`}>
                {campusOptions.map(({ name, courseIds }) => (
                    <div key={name} className="card rounded">
                        <div
                            className={`card-body ${styles.campusCard} ${
                                selectedCampus === name ? styles.selectedCampus : ""
                            }`}
                            onClick={() => handleCampusSelection(name)}
                        >
                            <h3 className="card-title">{name}</h3>
                            {courseIds.map((courseId, index) => (
                                <Link href={generateCourseLink(courseId)} key={index}>
                                    <div className={`card-body`}>
                                        <p className="card-text">{name} {index + 1}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampusSelection;
