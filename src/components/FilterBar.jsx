import { useMemo } from 'react';
import Select from 'react-select';
import { extractVenues } from '../utils/venueUtils';
import { extractCourses } from '../utils/courseUtils';

const timeSlots = [
    '08:00 AM', '08:50 AM', '09:40 AM', '10:30 AM', '11:20 AM',
    '12:10 PM', '01:00 PM', '01:50 PM', '02:40 PM', '03:30 PM',
    '04:20 PM', '05:10 PM', '06:00 PM',
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const lectureTypes = ['Lecture', 'Tutorial', 'Practical'];

function extractOptions(allData) {
    const venues = new Set();
    const courses = new Set();

    for (const sg of Object.keys(allData)) {
        for (const day of Object.keys(allData[sg])) {
            for (const time of Object.keys(allData[sg][day])) {
                const [code, room] = allData[sg][day][time];
                
                extractCourses(code).forEach((c) => courses.add(c));
                extractVenues(room).forEach((v) => venues.add(v));
            }
        }
    }

    return {
        venues: [...venues].sort(),
        courses: [...courses].sort(),
    };
}

function toSelectOptions(arr) {
    return arr.map((v) => ({ value: v, label: v }));
}

const selectStyles = {
    container: (base) => ({ ...base, minWidth: 160, flex: 1 }),
    control: (base) => ({
        ...base,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        fontSize: 13,
        minHeight: 36,
    }),
    menu: (base) => ({ ...base, zIndex: 20 }),
};

export default function FilterBar({ allData, filters, onChange }) {
    const { venues, courses } = useMemo(() => extractOptions(allData), [allData]);

    const subgroups = useMemo(
        () => Object.keys(allData).sort(),
        [allData],
    );

    const update = (key) => (selected) => {
        onChange({
            ...filters,
            [key]: selected ? (Array.isArray(selected) ? selected.map((s) => s.value) : [selected.value]) : [],
        });
    };

    return (
        <div className="filter-bar">
            <Select
                isMulti
                isClearable
                placeholder="Subgroup"
                options={toSelectOptions(subgroups)}
                onChange={update('subgroup')}
                styles={selectStyles}
            />
            <Select
                isMulti
                isClearable
                placeholder="Day"
                options={toSelectOptions(days)}
                onChange={update('day')}
                styles={selectStyles}
            />
            <Select
                isMulti
                isClearable
                placeholder="Time"
                options={toSelectOptions(timeSlots)}
                onChange={update('time')}
                styles={selectStyles}
            />
            <Select
                isMulti
                isClearable
                placeholder="Venue"
                options={toSelectOptions(venues)}
                onChange={update('venue')}
                styles={selectStyles}
            />
            <Select
                isMulti
                isClearable
                placeholder="Type (L/T/P)"
                options={toSelectOptions(lectureTypes)}
                onChange={update('type')}
                styles={selectStyles}
            />
            <Select
                isMulti
                isClearable
                placeholder="Course"
                options={toSelectOptions(courses)}
                onChange={update('course')}
                styles={selectStyles}
            />
        </div>
    );
}
