import * as R from 'ramda';
import {loadInput} from '../util';

const checkSum = (number: number, candidates: number[]): boolean => {
    return R.pipe(
        (candidates: number[]) => R.xprod(candidates, candidates),
        R.any(([first, second]) => first + second === number),
    )(candidates);
};

export const part1 = (preambleSize: number) => (numbers: number[]) => {
    return R.pipe(
        (numbers: number[]) => R.aperture(preambleSize + 1)(numbers),
        R.map(
            R.pipe(
                (numbers: number[]) => R.reverse(numbers),
                ([number, ...preamble]: number[]) => ({number, preamble}),
            ),
        ),
        R.find(({number, preamble}) => !checkSum(number, preamble)),
    )(numbers)?.number;
};

export const part2 = (numbers: number[], target: number) => {
    const lowerNumbers = numbers.filter(number => number < target);

    const indexPair = R.xprod(
        R.range(0, lowerNumbers.length),
        R.range(0, lowerNumbers.length),
    ).find(([from, to]) => {
        return R.sum(lowerNumbers.slice(from, to)) === target;
    });

    if (!indexPair) {
        throw Error(`No result found for target "${target}"`);
    }

    const [from, to] = indexPair;
    const range = R.slice(from, to, lowerNumbers);

    return Math.min(...range) + Math.max(...range);
};

export const parse = R.map(Number);

export const run = () => {
    const input = loadInput('2020-09');
    const numbers = parse(input);

    const part1Result = part1(25)(numbers);
    const part2Result = part2(numbers, part1Result!);

    console.log('Part 1:', part1Result);
    console.log('Part 2:', part2Result);
};
