import { useMemo, useState } from 'react';
import Select from 'react-select';
import { extractVenues } from '../utils/venueUtils';

const timeSlots = [
    '08:00 AM', '08:50 AM', '09:40 AM', '10:30 AM', '11:20 AM',
    '12:10 PM', '01:00 PM', '01:50 PM', '02:40 PM', '03:30 PM',
    '04:20 PM', '05:10 PM', '06:00 PM',
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const selectStyles = {
    container: (base) => ({ ...base, minWidth: 220, flex: 1, maxWidth: 360 }),
    control: (base) => ({
        ...base,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        fontSize: 13,
        minHeight: 36,
    }),
    menu: (base) => ({ ...base, zIndex: 20 }),
};

const getColorClass = (type) => {
    if (type === 'Lecture') return 'green';
    if (type === 'Tutorial') return 'blue';
    if (type === 'Practical') return 'yellow';
    return '';
};

/**
 * Build a lookup: { room -> { day -> { time -> [{ code, type, subgroup }] } } }
 */
function buildRoomMap(allData) {
    const roomMap = {};
    const allRooms = new Set();

    for (const sg of Object.keys(allData)) {
        for (const day of Object.keys(allData[sg])) {
            for (const time of Object.keys(allData[sg][day])) {
                const entry = allData[sg][day][time];
                const [code, rawRoom, , type] = entry;

                const venues = extractVenues(rawRoom);
                for (const room of venues) {
                    allRooms.add(room);

                    if (!roomMap[room]) roomMap[room] = {};
                    if (!roomMap[room][day]) roomMap[room][day] = {};

                    if (!roomMap[room][day][time]) {
                        roomMap[room][day][time] = [];
                    }

                    roomMap[room][day][time].push({ code, type, subgroup: sg });
                }
            }
        }
    }

    return { roomMap, allRooms: [...allRooms].sort() };
}

export default function RoomAvailability({ allData }) {
    const [selectedRoom, setSelectedRoom] = useState(null);

    const { roomMap, allRooms } = useMemo(() => buildRoomMap(allData), [allData]);

    const roomOptions = useMemo(
        () => allRooms.map((r) => ({ value: r, label: r })),
        [allRooms],
    );

    return (
        <>
            <div className="room-select-bar">
                <Select
                    isClearable
                    placeholder="Select a room..."
                    options={roomOptions}
                    onChange={(sel) => setSelectedRoom(sel ? sel.value : null)}
                    styles={selectStyles}
                />
            </div>

            {!selectedRoom && (
                <p className="room-placeholder">Choose a room above to see its availability.</p>
            )}

            {selectedRoom && (
                <section className="day-section">
                    <h2 className="day-heading">{selectedRoom}</h2>
                    <div className="table-scroll-wrapper">
                        <table className="room-availability-table">
                            <thead>
                                <tr>
                                    <th className="time-col-header">Time</th>
                                    {days.map((d) => (
                                        <th key={d} className="subgroup-header room-day-header">
                                            {d}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {timeSlots.map((time) => (
                                    <tr key={time}>
                                        <th className="time">{time}</th>

                                        {days.map((day) => {
                                            const entries = roomMap[selectedRoom]?.[day]?.[time];

                                            if (!entries || entries.length === 0) {
                                                return (
                                                    <td key={day} className="cell cell-free">
                                                        <span className="badge-free">Free</span>
                                                    </td>
                                                );
                                            }

                                            // Use the first entry's type for color
                                            const primaryType = entries[0].type;

                                            return (
                                                <td
                                                    key={day}
                                                    className={`cell ${getColorClass(primaryType)}`}
                                                >
                                                    <div className="schedule-input">
                                                        {entries[0].code}
                                                    </div>
                                                    <div className="schedule-input room-subgroups">
                                                        {entries.map((e) => e.subgroup).join(', ')}
                                                    </div>
                                                    <div className="schedule-input">
                                                        {primaryType}
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
            )}
        </>
    );
}
