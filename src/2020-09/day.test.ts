import * as R from 'ramda';

import {part1, part2, parse} from './day';

const testData = `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`;

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part1(5))(testData),
            ).toEqual(127);
        });
    });
    describe('Part 2', () => {
        it('works with test data', () => {
            expect(
                R.pipe(
                    R.trim,
                    R.split('\n'),
                    parse,
                    R.flip(R.curry(part2))(127),
                )(testData),
            ).toEqual(62);
        });
    });
});
