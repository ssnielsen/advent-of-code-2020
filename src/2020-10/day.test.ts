import * as R from 'ramda';

import {part1, part2, parse} from './day';

const testData = `
16
10
15
5
1
11
7
19
6
12
4
`;

const largerTestData = `
28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3
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
            ).toEqual(7 * 5);
        });
    });
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(
                    R.trim,
                    R.split('\n'),
                    parse,
                    part2,
                )(testData),
            ).toEqual(8);
        });
        it('works with the larger test data', () => {
            expect(
                R.pipe(
                    R.trim,
                    R.split('\n'),
                    parse,
                    part2,
                )(largerTestData),
            ).toEqual(19208);
        });
    });
});
