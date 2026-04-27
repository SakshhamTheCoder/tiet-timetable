import { extractVenues } from './src/utils/venueUtils.js';

console.log(extractVenues('DBMS-2'));
console.log(extractVenues('DBMS-2 LAB'));
console.log(extractVenues('\\DBMS-2 LAB'));
console.log(extractVenues('DBMS-2/LAB'));
