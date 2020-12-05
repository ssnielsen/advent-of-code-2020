import * as R from 'ramda';

import {findSeat} from './day';

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(findSeat('FBFBBFFRLR')).toEqual({
                row: 44,
                col: 5,
                id: 357,
            });
            expect(findSeat('BFFFBBFRRR')).toEqual({
                row: 70,
                col: 7,
                id: 567,
            });
            expect(findSeat('FFFBBBFRRR')).toEqual({
                row: 14,
                col: 7,
                id: 119,
            });
            expect(findSeat('BBFFBBFRLL')).toEqual({
                row: 102,
                col: 4,
                id: 820,
            });
        });
    });
});
