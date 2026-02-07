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
            venues.add(part);
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

