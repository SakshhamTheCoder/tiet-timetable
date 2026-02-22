import { useMemo } from 'react';
import { extractVenues } from '../utils/venueUtils';
import { extractCourses } from '../utils/courseUtils';

const timeSlots = [
    '08:00 AM', '08:50 AM', '09:40 AM', '10:30 AM', '11:20 AM',
    '12:10 PM', '01:00 PM', '01:50 PM', '02:40 PM', '03:30 PM',
    '04:20 PM', '05:10 PM', '06:00 PM',
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const getColorClass = (type) => {
    if (type === 'Lecture') return 'green';
    if (type === 'Tutorial') return 'blue';
    if (type === 'Practical') return 'yellow';
    return '';
};

function matchesFilter(entry, filters) {
    if (!entry) return false;
    const [code, room, , type] = entry;

    if (filters.venue.length) {
        const cellVenues = extractVenues(room);
        if (!filters.venue.some((v) => cellVenues.includes(v))) return false;
    }
    
    if (filters.course.length) {
        const cellCourses = extractCourses(code);
        if (!filters.course.some((c) => cellCourses.includes(c))) return false;
    }
    
    if (filters.type.length && !filters.type.includes(type)) return false;

    return true;
}

export default function ScheduleTable({ allData, filters }) {
    const subgroups = useMemo(() => {
        const all = Object.keys(allData).sort();
        if (filters.subgroup.length) return all.filter((sg) => filters.subgroup.includes(sg));
        return all;
    }, [allData, filters.subgroup]);

    const filteredDays = useMemo(() => {
        if (filters.day.length) return days.filter((d) => filters.day.includes(d));
        return days;
    }, [filters.day]);

    const filteredTimeSlots = useMemo(() => {
        if (filters.time.length) return timeSlots.filter((t) => filters.time.includes(t));
        return timeSlots;
    }, [filters.time]);

    return (
        <div className="day-tables-container">
            {filteredDays.map((day) => (
                <section key={day} className="day-section">
                    <h2 className="day-heading">{day}</h2>
                    <div className="table-scroll-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th className="time-col-header">Time</th>
                                    {subgroups.map((sg) => (
                                        <th key={sg} className="subgroup-header">
                                            {sg}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTimeSlots.map((time) => (
                                    <tr key={time}>
                                        <th className="time">{time}</th>

                                        {subgroups.map((sg) => {
                                            const entry =
                                                allData[sg]?.[day]?.[time];

                                            if (!entry || !matchesFilter(entry, filters))
                                                return (
                                                    <td
                                                        key={sg}
                                                        className="cell-no-value"
                                                    />
                                                );

                                            const [code, room, , type] = entry;

                                            return (
                                                <td
                                                    key={sg}
                                                    className={`cell ${getColorClass(type)}`}
                                                >
                                                    <div className="schedule-input">
                                                        {code}
                                                    </div>
                                                    <div className="schedule-input">
                                                        {room}
                                                    </div>
                                                    <div className="schedule-input">
                                                        {type}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ))}
        </div>
    );
}
