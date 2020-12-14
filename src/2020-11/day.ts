import * as R from 'ramda';
import {loadInput} from '../util';

type Position = 'L' | '.' | '#';

type Layout = Position[][];

const print = (layout: Layout) => {
    const printable = layout
        .map(line => line.join(''))
        .join('\n');

    console.log(`${printable}\n\n`);
};

const nearbyNeighbors = (
    layout: Layout,
    x: number,
    y: number,
): number => {
    return R.pipe(
        () => R.xprod([-1, 0, 1], [-1, 0, 1]),
        R.map(([deltaX, deltaY]) => {
            if (deltaX === 0 && deltaY === 0) {
                return 0;
            }

            return layout[x + deltaX]?.[y + deltaY] === '#'
                ? 1
                : 0;
        }),
        R.sum,
    )();
};

const makeRunIterationFunction = (
    occupiedNeighbors: (
        layout: Layout,
        x: number,
        y: number,
    ) => number,
    scoringFunction: (
        neighbors: number,
        position: Exclude<Position, '.'>,
    ) => Position,
) => (layout: Layout): Layout => {
    const nextLayout = layout.map((line, x) => {
        return line.map((position, y) => {
            if (position === '.') {
                return '.';
            }

            return scoringFunction(
                occupiedNeighbors(layout, x, y),
                position,
            );
        });
    });

    return nextLayout;
};

const isStable = (
    previous: Layout,
    layout: Layout,
): boolean => {
    return previous.every((line, x) => {
        return line.every((position, y) => {
            return position === layout[x][y];
        });
    });
};

const runUntilStable = (
    layout: Layout,
    runIteration: (layout: Layout) => Layout,
): Layout => {
    const nextLayout = runIteration(layout);

    return isStable(layout, nextLayout)
        ? nextLayout
        : runUntilStable(nextLayout, runIteration);
};

const countOccupiedSeats = (layout: Layout): number => {
    return R.pipe(
        R.map(
            R.pipe(
                R.map((position: Position) =>
                    position === '#' ? 1 : 0,
                ),
                R.sum,
            ),
        ),
        R.sum,
    )(layout);
};

export const part1 = (layout: Layout): number => {
    const runner = makeRunIterationFunction(
        nearbyNeighbors,
        (neighbors, position) => {
            switch (position) {
                case 'L':
                    return neighbors === 0 ? '#' : 'L';
                case '#':
                    return neighbors >= 4 ? 'L' : '#';
            }
        },
    );

    const stableConfiguration = runUntilStable(
        layout,
        runner,
    );
    const occupiedSeats = countOccupiedSeats(
        stableConfiguration,
    );

    return occupiedSeats;
};

const directions = [
    {x: 1, y: 0},
    {x: 1, y: 1},
    {x: 1, y: -1},
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: -1, y: 0},
    {x: -1, y: 1},
    {x: -1, y: -1},
];

type Direction = typeof directions[number];

const makeSight = (
    layout: Layout,
    x: number,
    y: number,
    direction: Direction,
): Position | undefined => {
    const lookX = x + direction.x;
    const lookY = y + direction.y;
    const lookingAt = layout[lookX]?.[lookY];

    if (lookingAt === undefined) {
        return undefined;
    } else {
        if (lookingAt === '#' || lookingAt === 'L') {
            return lookingAt;
        } else {
            return makeSight(
                layout,
                lookX,
                lookY,
                direction,
            );
        }
    }
};

const visibleNeighbors = (
    layout: Layout,
    x: number,
    y: number,
): number => {
    return R.pipe(
        R.map((direction: Direction) => {
            return makeSight(layout, x, y, direction) ===
                '#'
                ? 1
                : 0;
        }),
        R.sum,
    )(directions);
};

export const part2 = (layout: Layout): number => {
    const runner = makeRunIterationFunction(
        visibleNeighbors,
        (neighbors, position) => {
            switch (position) {
                case 'L':
                    return neighbors === 0 ? '#' : 'L';
                case '#':
                    return neighbors >= 5 ? 'L' : '#';
            }
        },
    );

    const stableConfiguration = runUntilStable(
        layout,
        runner,
    );
    const occupiedSeats = countOccupiedSeats(
        stableConfiguration,
    );

    return occupiedSeats;
};

export const parse: (input: string[]) => Layout = R.pipe(
    R.map(
        R.pipe(
            R.split(''),
            R.map(x => x as Position),
        ),
    ),
);

export const run = () => {
    const input = loadInput('2020-11');
    const layout = parse(input);

    console.log('Part 1:', part1(layout));
    console.log('Part 2:', part2(layout));
};
