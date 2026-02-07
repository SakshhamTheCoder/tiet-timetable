const timeSlots = [
    '08:00 AM',
    '08:50 AM',
    '09:40 AM',
    '10:30 AM',
    '11:20 AM',
    '12:10 PM',
    '01:00 PM',
    '01:50 PM',
    '02:40 PM',
    '03:30 PM',
    '04:20 PM',
    '05:10 PM',
    '06:00 PM',
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const getColorClass = (type) => {
    if (type === 'Lecture') return 'green';
    if (type === 'Tutorial') return 'purple';
    if (type === 'Practical') return 'yellow';
    return '';
};

export default function ScheduleTable({ scheduleData }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="time-specific">Time</th>
                    {days.map((d) => (
                        <th key={d}>{d}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {timeSlots.map((time) => (
                    <tr key={time}>
                        <th className="time">{time}</th>

                        {days.map((day) => {
                            const entry = scheduleData?.[day]?.[time];
                            if (!entry) return <td key={day} className="cell-no-value" />;

                            const [code, room, , type] = entry;

                            return (
                                <td key={day} className={`cell ${getColorClass(type)}`}>
                                    <div className="schedule-input">{code}</div>
                                    <div className="schedule-input">{room}</div>
                                    <div className="schedule-input">{type}</div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

