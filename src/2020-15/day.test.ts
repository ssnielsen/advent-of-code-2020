import * as R from 'ramda';

import {part1, part2, parse} from './day';

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, parse, part1(2020))('0,3,6'),
            ).toEqual(436);
        });

        it('works with test data 1,3,2', () => {
            expect(
                R.pipe(R.trim, parse, part1(2020))('1,3,2'),
            ).toEqual(1);
        });
    });

    describe('Part 2', () => {
        it('works with test data 0,3,6', () => {
            expect(
                R.pipe(R.trim, parse, part2(2020))('0,3,6'),
            ).toEqual(436);
        });

        it('works with test data 1,3,2', () => {
            expect(
                R.pipe(R.trim, parse, part2(2020))('1,3,2'),
            ).toEqual(1);
        });

        it('works with test data 0,3,6 after a long time', () => {
            expect(
                R.pipe(
                    R.trim,
                    parse,
                    part2(30_000_000),
                )('0,3,6'),
            ).toEqual(175594);
        });

        it('works with test data 1,3,2 after a long time', () => {
            expect(
                R.pipe(
                    R.trim,
                    parse,
                    part2(30_000_000),
                )('1,3,2'),
            ).toEqual(2578);
        });
    });
});
