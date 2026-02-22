import { useState } from 'react';
import data from './assets/results_updated.json';

import FilterBar from './components/FilterBar';
import ScheduleTable from './components/ScheduleTable';

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

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>Timetable</h1>

            <FilterBar
                allData={data}
                filters={filters}
                onChange={setFilters}
            />

            <ScheduleTable allData={data} filters={filters} />
        </div>
    );
}
