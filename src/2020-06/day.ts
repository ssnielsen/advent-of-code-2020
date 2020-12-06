import * as R from 'ramda';

import {loadRawInput} from '../util';

type Group = string[];

export const part1: (groups: Group[]) => number = R.pipe(
    R.map(
        R.pipe(
            R.map(R.split('')),
            R.flatten,
            R.uniq,
            R.length,
        ),
    ),
    R.sum,
);

const allLetters = R.split(
    '',
    'abcdefghijklmnopqrstuvwxyz',
);

export const part2: (groups: Group[]) => number = R.pipe(
    R.map(
        R.pipe(
            R.map(R.split('')),
            R.reduce(R.intersection, allLetters),
            R.length,
        ),
    ),
    R.sum,
);

export const parse: (input: string) => Group[] = R.pipe(
    R.split('\n\n'),
    R.map(R.split('\n')),
);

export const run = () => {
    const input = loadRawInput('2020-06');
    const groups = parse(input);

    console.log('Part 1:', part1(groups));
    console.log('Part 2:', part2(groups));
};
