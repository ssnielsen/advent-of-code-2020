import * as R from 'ramda';
import {hasValue, loadInput} from '../util';

export const part1 = (adapters: number[]) => {
    const sorted = R.sortBy(R.identity, adapters);

    const result = [...sorted, R.last(sorted)! + 3].reduce(
        (state, adapter) => {
            const diff = adapter - state.jolts;

            switch (diff) {
                case 3:
                    return {
                        ...state,
                        threes: state.threes + 1,
                        jolts: state.jolts + diff,
                    };
                case 1:
                    return {
                        ...state,
                        ones: state.ones + 1,
                        jolts: state.jolts + diff,
                    };
                default:
                    return {
                        ...state,
                        jolts: state.jolts + diff,
                    };
            }
        },
        {ones: 0, threes: 0, jolts: 0},
    );

    return result.ones * result.threes;
};

let cache: {[key: number]: number} = {};

const solvePart2 = (
    adapters: number[],
    numberOfPermutations: number,
    currentJolt: number,
): number => {
    const target = R.last(adapters)! + 3;

    if (currentJolt === target - 3) {
        return 1;
    }

    if (hasValue(cache[currentJolt])) {
        return cache[currentJolt];
    }

    const diffs = adapters
        .filter(
            adapter =>
                adapter - currentJolt <= 3 &&
                adapter - currentJolt >= 1,
        )
        .map(adapter => adapter - currentJolt);

    const perms = R.sum(
        diffs.map(diff => {
            return solvePart2(
                adapters,
                numberOfPermutations,
                currentJolt + diff,
            );
        }),
    );

    cache[currentJolt] = perms;

    return perms;
};

export const part2 = (adapters: number[]) => {
    cache = {};
    const sorted = R.sortBy(R.identity, adapters);
    const result = solvePart2(sorted, 1, 0);

    return result;
};

export const parse = R.map(Number);

export const run = () => {
    const input = loadInput('2020-10');

    const adapters = parse(input);

    console.log('Part 1:', part1(adapters));
    console.log('Part 2:', part2(adapters));
};
