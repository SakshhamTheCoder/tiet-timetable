import { useState } from 'react';
import data from './assets/results_updated.json';

import FilterBar from './components/FilterBar';
import ScheduleTable from './components/ScheduleTable';
import RoomAvailability from './components/RoomAvailability';

const emptyFilters = {
    subgroup: [],
    day: [],
    time: [],
    venue: [],
    type: [],
    course: [],
};

export default function App() {
    const [filters, setFilters] = useState(emptyFilters);
    const [view, setView] = useState('timetable');

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>Timetable</h1>

            {/* <div className="view-toggle">
                <button
                    className={`view-toggle-btn${view === 'timetable' ? ' active' : ''}`}
                    onClick={() => setView('timetable')}
                >
                    Timetable
                </button>
                <button
                    className={`view-toggle-btn${view === 'rooms' ? ' active' : ''}`}
                    onClick={() => setView('rooms')}
                >
                    Room Availability
                </button>
            </div> */}

            {view === 'timetable' ? (
                <>
                    <FilterBar
                        allData={data}
                        filters={filters}
                        onChange={setFilters}
                    />
                    <ScheduleTable allData={data} filters={filters} />
                </>
            ) : (
                <RoomAvailability allData={data} />
            )}
        </div>
    );
}
