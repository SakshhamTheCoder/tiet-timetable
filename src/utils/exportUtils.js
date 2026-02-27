import { extractVenues } from './venueUtils';
import { extractCourses } from './courseUtils';

const timeSlots = [
    '08:00 AM', '08:50 AM', '09:40 AM', '10:30 AM', '11:20 AM',
    '12:10 PM', '01:00 PM', '01:50 PM', '02:40 PM', '03:30 PM',
    '04:20 PM', '05:10 PM', '06:00 PM',
];

const endTimes = {
    '08:00 AM': '08:50 AM',
    '08:50 AM': '09:40 AM',
    '09:40 AM': '10:30 AM',
    '10:30 AM': '11:20 AM',
    '11:20 AM': '12:10 PM',
    '12:10 PM': '01:00 PM',
    '01:00 PM': '01:50 PM',
    '01:50 PM': '02:40 PM',
    '02:40 PM': '03:30 PM',
    '03:30 PM': '04:20 PM',
    '04:20 PM': '05:10 PM',
    '05:10 PM': '06:00 PM',
    '06:00 PM': '06:50 PM',
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

export function exportToCSV(allData, filters) {
    const allSubgroups = Object.keys(allData).sort();
    const subgroups = filters.subgroup.length ? allSubgroups.filter(sg => filters.subgroup.includes(sg)) : allSubgroups;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const filteredDays = filters.day.length ? days.filter(d => filters.day.includes(d)) : days;

    const filteredTimeSlots = filters.time.length ? timeSlots.filter(t => filters.time.includes(t)) : timeSlots;

    const headers = ['branch', 'subgroup', 'teacherEmpCode', 'courseCode', 'courseName', 'startTime', 'endTime', 'day', 'classType', 'room', 'semesterCode'];
    const rows = [];
    rows.push(headers.join(','));

    for (const sg of subgroups) {
        for (const day of filteredDays) {
            for (const time of filteredTimeSlots) {
                const entry = allData[sg]?.[day]?.[time];
                if (entry && matchesFilter(entry, filters)) {
                    const [code, room, courseName, type] = entry;
                    const endTime = endTimes[time] || '';
                    
                    const row = [
                        `""`, // branch
                        `"${sg}"`, // subgroup
                        `""`, // teacherEmpCode
                        `"${code}"`, // courseCode
                        `"${courseName || ''}"`, // courseName
                        `"${time}"`, // startTime
                        `"${endTime}"`, // endTime
                        `"${day}"`, // day
                        `"${type}"`, // classType
                        `"${room}"`, // room
                        `"2526EVEN"` // semesterCode
                    ];
                    rows.push(row.join(','));
                }
            }
        }
    }

    const csvContent = rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'timetable_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
