import * as R from 'ramda';

import {part1, parse, part2} from './day';

const testData = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`;

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part1)(testData),
            ).toEqual(5);
        });
    });

    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part2)(testData),
            ).toEqual(8);
        });
    });
});
