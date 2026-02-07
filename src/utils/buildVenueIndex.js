import { extractVenues } from './venueUtils';
import { zipElectives } from './zipElectives';

export function buildVenueIndex(allData) {
    const venueIndex = {};

    for (const subgroup in allData) {
        const timetable = allData[subgroup];

        for (const day in timetable) {
            for (const time in timetable[day]) {
                const entry = timetable[day][time];
                if (!entry) continue;

                const [rawCode, rawVenue, , type] = entry;

                // 🔑 Correct elective handling
                const pairs = zipElectives(rawCode, rawVenue);

                pairs.forEach(({ code, venue }) => {
                    const cleanVenues = extractVenues(venue);

                    cleanVenues.forEach((v) => {
                        venueIndex[v] ??= {};
                        venueIndex[v][day] ??= {};
                        venueIndex[v][day][time] ??= [];

                        venueIndex[v][day][time].push({
                            subgroup,
                            code,
                            type,
                        });
                    });
                });
            }
        }
    }

    return venueIndex;
}

