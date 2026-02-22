export function extractCourses(raw) {
    if (!raw || typeof raw !== 'string') return [];

    const parts = raw
        .toUpperCase()
        .replace(/[()]/g, ' ')
        .split('/')
        .map((p) => p.trim())
        .filter(Boolean);

    const courses = new Set();

    for (const part of parts) {
        const tokens = part.split(/\s+/);

        tokens.forEach((t) => {
            // Strip trailing L, T, or P if it follows a number or 'X'
            // For example: UMA023L -> UMA023, UCSXX2P -> UCSXX2
            let code = t;
            if (/^[A-Z]{1,4}[0-9X]{1,4}[LTP]$/.test(code)) {
                code = code.slice(0, -1);
            }

            if (/^[A-Z]{1,4}[0-9X]{1,4}$/.test(code)) {
                courses.add(code);
            } else if (code.length >= 5) {
                courses.add(code);
            }
        });
    }

    return [...courses];
}
