import * as R from 'ramda';

import {part1, part2, parse} from './day';

const testData = `
939
7,13,x,x,59,x,31,19
`;

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, parse, part1)(testData),
            ).toEqual(295);
        });
    });
    describe('Part 2', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, parse, part2)(testData),
            ).toEqual(1068781);
        });
        it('works with small test data', () => {
            expect(
                R.pipe(
                    R.trim,
                    parse,
                    part2,
                )(`
        22
        17,x,13,19`),
            ).toEqual(3417);
        });
    });
});
