import * as R from 'ramda';

import {part1, part2, parse} from './day';

const testData = `
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0
`;

const testDataPart2 = `
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1
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
            ).toEqual(165);
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
                )(testDataPart2),
            ).toEqual(208);
        });
    });
});
