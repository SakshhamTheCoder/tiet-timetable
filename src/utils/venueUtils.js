export function extractVenues(raw) {
    if (!raw || typeof raw !== 'string') return [];

    const parts = raw
        .toUpperCase()
        .replace(/[()]/g, ' ')
        .split('/')
        .map((p) => p.trim())
        .filter(Boolean);

    const venues = new Set();

    for (const part of parts) {
        const tokens = part.split(/\s+/);

        // 🔑 W/SHOP — normalize ALL variants
        if (part.startsWith('W/SHOP')) {
            venues.add('W/SHOP');
            continue;
        }

        // Numeric rooms (LT101, F303, C203)
        tokens.forEach((t) => {
            if (/^[A-Z]{1,3}\d{2,4}$/.test(t)) {
                venues.add(t);
            }
        });

        // Symbolic blocks (IS-1, PL-3, CAD-1)
        tokens.forEach((t) => {
            if (/^[A-Z]{2,5}-\d{1,2}$/.test(t)) {
                venues.add(t);
            }
        });

        // Named labs (AI LAB, PGR LAB, HPC LAB)
        if (part.endsWith('LAB')) {
            const prefix = part.replace('LAB', '').trim();
            if (prefix.length > 0 && !/^[?-\s]+$/.test(prefix)) {
                venues.add(part);
            }
        }
    }

    return [...venues];
}

export function normalizeVenue(raw) {
    if (!raw) return null;

    let v = raw.toUpperCase();

    v = v.replace(/\(.*?\)/g, '');
    v = v.replace(/\bLAB\b/g, '');
    v = v.replace(/\bW\/SHOP\b/g, '');
    v = v.replace(/\s+/g, ' ').trim();

    if (/^[A-Z]{1,3}\d{2,4}$/.test(v)) return v;
    if (/^[A-Z]{2,5}-\d{1,2}$/.test(v)) return v;

    return null;
}

export function getUnifiedRoomName(room) {
    if (!room) return '';
    if (room === 'W/SHOP') return 'W/SHOP';
    
    let n = room.toUpperCase();
    n = n.replace(/[\\/]/g, '');
    n = n.replace(/\bLAB\b/g, '');
    n = n.replace(/\s+/g, '');

    // Remove suffix patterns: NA, TA, PG, FIST, NEW followed by optional dash and digits
    n = n.replace(/(?:NA|TA|PG|FIST|NEW)-?\d*$/g, '');
    
    // Standardize letter-number format with dash eg: DBMS2 -> DBMS-2, handling ampersands too
    n = n.replace(/^([A-Z&]+)-?(\d+.*)$/, '$1-$2');

    // Analog lab and High Voltage lab aliases
    n = n.replace(/^ANALOG.*B-?(\d+)/, 'ANALOG-B$1');
    n = n.replace(/^HIGHVOLTAGE.*C-?(\d+)/, 'HIGHVOLTAGE-C$1');

    // Remove any remaining leading/trailing non-alphanumeric (except dashes and ampersands)
    n = n.replace(/^[^A-Z0-9&]+|[^A-Z0-9&]+$/g, '');

    if (n.length < 2 || /^[-?]+$/.test(n)) {
        return '';
    }
    
    return n;
}
