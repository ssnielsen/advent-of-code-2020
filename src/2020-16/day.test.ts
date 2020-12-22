import * as R from 'ramda';

import {part1, part2, parse} from './day';

const testData = `
class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
`;

const secondTestData = `
class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
`;

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(
                    R.trim,
                    parse,
                    ({rules, nearbyTickets}) =>
                        part1(rules, nearbyTickets),
                )(testData),
            ).toEqual(71);
        });
    });

    describe('Part 2', () => {
        // it('filters correctly the test data', () => {
        //     expect(
        //         R.pipe(
        //             R.trim,
        //             parse,
        //             ({rules, myTicket, nearbyTickets}) =>
        //                 part2(
        //                     rules,
        //                     myTicket,
        //                     nearbyTickets,
        //                 ),
        //         )(testData),
        //     ).toEqual([[7, 3, 47]]);
        // });
        // it('works with the second test data', () => {
        //     expect(
        //         R.pipe(
        //             R.trim,
        //             parse,
        //             ({rules, myTicket, nearbyTickets}) =>
        //                 part2(
        //                     rules,
        //                     myTicket,
        //                     nearbyTickets,
        //                 ),
        //         )(secondTestData),
        //     ).toEqual([[7, 3, 47]]);
        // });
    });
});
