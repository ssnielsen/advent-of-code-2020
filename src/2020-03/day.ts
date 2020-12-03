import * as R from 'ramda';
import {loadInput} from '../util';

type Forest = boolean[][];

export const solve = (forest: Forest, slope: {x: number; y: number}) => {
    const {x: slopeX, y: slopeY} = slope;

    return forest.reduce((trees, treeLine, y) => {
        // Skip first row or rows that are skipped due to slope
        if (y === 0 || y % slopeY !== 0) {
            return trees;
        }

        // Calculate x as a function of y
        const x = (slopeX / slopeY) * (y - 1) + slopeX / slopeY;

        // If x is beyond the input, wrap around
        return trees + (treeLine[x % treeLine.length] ? 1 : 0);
    }, 0);
};

export const part1 = (forest: Forest) => {
    return solve(forest, {x: 3, y: 1});
};

export const part2 = (forest: Forest) => {
    const slopes = [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 5, y: 1},
        {x: 7, y: 1},
        {x: 1, y: 2},
    ];

    return R.pipe(
        R.map((slope: typeof slopes[number]) => solve(forest, slope)),
        R.reduce(R.multiply, 1),
    )(slopes);
};

export const parse = (input: string[]): Forest => {
    return R.pipe(R.map((line: string) => R.map(x => x === '#', [...line])))(
        input,
    );
};

export const run = () => {
    const input = loadInput('2020-03');
    const forest = parse(input);

    console.log('Part 1:', part1(forest));
    console.log('Part 2:', part2(forest));
};
