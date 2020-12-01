import * as R from 'ramda';

import {parse, part1, part2} from './day';

const testData = `
1721
979
366
299
675
1456
`;

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part1)(testData),
            ).toEqual(514579);
        });
    });

    describe('Part 2', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part2)(testData),
            ).toEqual(241861950);
        });
    });
});
