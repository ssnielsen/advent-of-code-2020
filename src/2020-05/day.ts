import * as R from 'ramda';

import {loadInput} from '../util';

const makeSearchFunction = <U extends string, L extends string>(
    upper: U,
    lower: L,
    size: number,
) => (input: string) => {
    return R.pipe(
        R.split(''),
        R.reduce(
            ({max, min}, char) => {
                switch (char) {
                    case upper:
                        return {
                            max: max,
                            min: max - Math.floor((max - min) / 2),
                        };
                    case lower:
                        return {
                            max: min + Math.floor((max - min) / 2),
                            min: min,
                        };
                    default:
                        throw Error(
                            `Unrecognized character "${char}". Expected either "${upper}" or "${lower}"`,
                        );
                }
            },
            {max: size - 1, min: 0},
        ),
    )(input);
};

const findRow = makeSearchFunction('B', 'F', 128);
const findCol = makeSearchFunction('R', 'L', 8);

export const findSeat = (boardingPass: string) => {
    const rowPart = boardingPass.slice(0, 7);
    const colPart = boardingPass.slice(7);

    const result = {
        row: findRow(rowPart),
        col: findCol(colPart),
    };

    if (
        result.row.min !== result.row.max ||
        result.col.min !== result.col.max
    ) {
        throw Error(
            `Unexpected result after finding row and col for "${boardingPass}". Result: ${result}`,
        );
    }

    return {
        row: result.row.max,
        col: result.col.max,
        id: result.row.max * 8 + result.col.max,
    };
};

type Seat = ReturnType<typeof findSeat>;

const part1 = R.pipe(
    R.map(findSeat),
    R.sortBy((seat: Seat) => seat.id),
    R.last,
    (seat: Seat) => seat.id,
);

const part2 = R.pipe(
    R.map(findSeat),
    R.sortBy((seat: Seat) => seat.id),
    R.map((seat: Seat) => seat.id),
    sorted => R.aperture(2, sorted),
    R.find(([id1, id2]) => id2 - id1 === 2),
    result => {
        if (!result) {
            return -1;
        }

        const [before] = result!;
        return before + 1;
    },
);

export const run = () => {
    const input = loadInput('2020-05');

    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
};
