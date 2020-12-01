import * as R from 'ramda';

import {loadInput} from '../util';

export const part1 = (expenses: number[]) => {
    return R.pipe(
        (numbers: number[]) => R.xprod(numbers, numbers),
        R.find(([first, second]) => first + second === 2020),
        pair => {
            if (!pair) {
                return undefined;
            } else {
                const [first, second] = pair;

                return first * second;
            }
        },
    )(expenses);
};

export const part2 = (expenses: number[]) => {
    return R.pipe(
        (numbers: number[]) =>
            R.pipe(
                (numbers: number[]) => R.xprod(numbers, numbers),
                pairs => R.xprod(pairs, numbers),
            )(numbers),
        R.find(([[first, second], third]) => first + second + third === 2020),
        pair => {
            if (!pair) {
                return undefined;
            } else {
                const [[first, second], third] = pair;

                return first * second * third;
            }
        },
    )(expenses);
};

export const parse = R.map(Number);

export const run = () => {
    const input = loadInput('2020-01');
    const expenses = R.pipe(parse)(input);

    console.log('Part 1:', part1(expenses));
    console.log('Part 2:', part2(expenses));
};
