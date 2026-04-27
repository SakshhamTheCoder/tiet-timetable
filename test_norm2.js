const cases = [
    'G-203(NA-1) LAB',
    'G-203NA-1 LAB',
    'G-203NA1 LAB',
    'G-203 TA14',
    '-1 LAB',
    '? LAB',
    'ANALOG-B211 LAB',
    'ANALOGB-211 LAB',
    'ANALOGSIGNALB-211 LAB'
];

function test(room) {
    let n = room.toUpperCase();
    n = n.replace(/[\\/]/g, '');
    n = n.replace(/\bLAB\b/g, '');
    n = n.replace(/\s+/g, '');
    
    n = n.replace(/(?:NA|TA|PG)-?\d*$/g, '');
    
    n = n.replace(/^([A-Z]+)-?(\d+.*)$/, '$1-$2');
    
    n = n.replace(/^ANALOG.*B-?(\d+)/, 'ANALOG-B$1');

    n = n.replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/g, '');

    if (n.length < 2 || /^[-?]+$/.test(n)) {
        return '';
    }
    return n;
}

cases.forEach(c => console.log(`${c} -> ${test(c)}`));
