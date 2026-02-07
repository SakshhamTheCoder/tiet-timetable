import { useMemo, useState } from 'react';
import data from './assets/results_updated.json';

import ViewToggle from './components/ViewToggle';
import ScheduleTable from './components/ScheduleTable';
import VenueScheduleTable from './components/VenueScheduleTable';
import InputBox from './components/InputBox';
import VenueSelector from './components/VenueSelector';

import { buildVenueIndex } from './utils/buildVenueIndex';

export default function App() {
    const venueIndex = useMemo(() => buildVenueIndex(data), []);
    const venues = Object.keys(venueIndex).sort();

    const [view, setView] = useState('MASTER');
    const [subgroup, setSubgroup] = useState(null);
    const [venue, setVenue] = useState(null);

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>Timetable</h1>

            <ViewToggle
                view={view}
                onChange={(v) => {
                    setView(v);
                    setSubgroup(null);
                    setVenue(null);
                }}
            />

            {view === 'MASTER' && (
                <>
                    <InputBox onChange={(o) => setSubgroup(o?.value)} />
                    {subgroup && <ScheduleTable scheduleData={data[subgroup]} />}
                </>
            )}

            {view === 'VENUE' && (
                <>
                    <VenueSelector venues={venues} onChange={setVenue} />
                    {venue && <VenueScheduleTable venue={venue} venueData={venueIndex[venue]} />}
                </>
            )}
        </div>
    );
}

