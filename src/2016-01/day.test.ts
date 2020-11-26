import * as R from 'ramda';

import {parse, part1, part2} from './day';

describe('Day 01', () => {
    describe('Part 1', () => {
        it('R2, L3', () => {
            expect(R.pipe(parse, part1)('R2, L3')).toEqual(5);
        });

        it('R2, R2, R2', () => {
            expect(R.pipe(parse, part1)('R2, R2, R2')).toEqual(2);
        });

        it('R5, L5, R5, R3', () => {
            expect(R.pipe(parse, part1)('R5, L5, R5, R3')).toEqual(12);
        });
    });

    describe('Part 2', () => {
        it('R8, R4, R4, R8', () => {
            expect(R.pipe(parse, part2)('R8, R4, R4, R8')).toEqual(4);
        });
    });
});
