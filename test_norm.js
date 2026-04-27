import { extractVenues, getUnifiedRoomName } from './src/utils/venueUtils.js';

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

cases.forEach(c => {
    const extracted = extractVenues(c);
    extracted.forEach(ex => {
        console.log(`Original: ${c} -> Extracted: ${ex} -> Unified: ${getUnifiedRoomName(ex)}`);
    });
});
