import * as R from 'ramda';

import {part1, parse, part2} from './day';

const testData = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`;

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(
                    R.trim,
                    R.split('\n'),
                    parse,
                    part1,
                )(testData),
            ).toEqual(37);
        });
    });

    describe('Part 2', () => {
        it('works with test data', () => {
            expect(
                R.pipe(
                    R.trim,
                    R.split('\n'),
                    parse,
                    part2,
                )(testData),
            ).toEqual(26);
        });
    });
});
