const times = [
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

const color = (t) => (t === 'Lecture' ? 'green' : t === 'Tutorial' ? 'purple' : 'yellow');

export default function VenueScheduleTable({ venue, venueData }) {
    return (
        <>
            <h2 style={{ textAlign: 'center' }}>{venue}</h2>

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
                    {times.map((time) => (
                        <tr key={time}>
                            <th className="time">{time}</th>
                            {days.map((day) => {
                                const entries = venueData?.[day]?.[time];
                                if (!entries) return <td key={day} className="cell-no-value" />;

                                const grouped = Object.values(
                                    entries.reduce((a, e) => {
                                        const k = `${e.code}-${e.type}`;
                                        a[k] ??= { ...e, subgroups: [] };
                                        a[k].subgroups.push(e.subgroup);
                                        return a;
                                    }, {}),
                                );

                                return (
                                    <td key={day} className={`cell ${color(grouped[0].type)}`}>
                                        {grouped.map((g, i) => (
                                            <div key={i}>
                                                <div className="schedule-input code">{g.code}</div>
                                                <div className="schedule-input">{g.subgroups.join(', ')}</div>
                                                <div className="schedule-input meta">{g.type}</div>
                                            </div>
                                        ))}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

