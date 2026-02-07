export function zipElectives(rawCodes, rawVenues) {
    if (!rawCodes || !rawVenues) return [];

    const codes = rawCodes.split('/').map((s) => s.trim());
    const venues = rawVenues.split('/').map((s) => s.trim());

    const pairs = [];
    const len = Math.min(codes.length, venues.length);

    for (let i = 0; i < len; i++) {
        pairs.push({
            code: codes[i],
            venue: venues[i],
        });
    }

    return pairs;
}

