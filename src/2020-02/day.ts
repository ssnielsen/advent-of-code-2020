import * as R from 'ramda';

import {loadInput} from '../util';

type Rule = {
    min: number;
    max: number;
    character: string;
};

type Line = {
    rule: Rule;
    password: string;
};

const hasCharacterNTimes = (line: Line) => {
    const {
        password,
        rule: {min, max, character},
    } = line;

    const regex = new RegExp(`(${character})`, 'g');
    const matches = password.match(regex)?.length;

    if (!matches) {
        return false;
    }

    return matches >= min && matches <= max;
};

const part1 = (database: Line[]) => {
    return R.filter(hasCharacterNTimes, database).length;
};

const hasCharacterOnceInPosition = (line: Line) => {
    const {
        password,
        rule: {min, max, character},
    } = line;

    const hasCharInFirstPosition = password.charAt(min - 1) === character;
    const hasCharInSecondPosition = password.charAt(max - 1) === character;

    return R.xor(hasCharInFirstPosition, hasCharInSecondPosition);
};

const part2 = (database: Line[]) => {
    return R.filter(hasCharacterOnceInPosition, database).length;
};

const inputRegex = /(\d+)-(\d+)\s(\w):\s(\w+)/;

const parseLine = (line: string) => {
    const result = inputRegex.exec(line);

    if (!result) {
        throw Error(`Not valid input: "${line}"`);
    }

    return {
        rule: {
            min: Number(result[1]),
            max: Number(result[2]),
            character: result[3],
        },
        password: result[4],
    };
};

export const run = () => {
    const input = loadInput('2020-02');

    const database = R.map(parseLine, input);

    console.log('Part 1:', part1(database));
    console.log('Part 2:', part2(database));
};
