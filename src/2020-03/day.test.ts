import * as R from 'ramda';

import {parse, part1, part2, solve} from './day';

const testData = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`;

const smallTestData = `
.......
...#...
......#
..#....
.......
.......
`;

const smallTestData2 = `
...
...
.#.
...
..#
...
#..
`;

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with small test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part1)(smallTestData),
            ).toEqual(3);
        });
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part1)(testData),
            ).toEqual(7);
        });
    });

    describe('Part 2', () => {
        it('works with small test data', () => {
            expect(
                R.pipe(
                    R.trim,
                    R.split('\n'),
                    parse,
                    R.flip(R.curry(solve))({x: 1, y: 2}),
                )(smallTestData2),
            ).toEqual(3);
        });
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part2)(testData),
            ).toEqual(336);
        });
    });
});
