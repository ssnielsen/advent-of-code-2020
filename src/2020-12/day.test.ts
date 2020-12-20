import * as R from 'ramda';

import {part1, parse, part2} from './day';

const testData = `
F10
N3
F7
R90
F11
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
            ).toEqual(25);
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
            ).toEqual(286);
        });
    });
});
