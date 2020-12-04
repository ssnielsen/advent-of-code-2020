import * as R from 'ramda';
import {loadRawInput} from '../util';

const COUNTRY_ID = 'cid';

const INFORMATIONS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', COUNTRY_ID];
const MISSING_CID = INFORMATIONS.filter(info => info !== COUNTRY_ID);

type Passport = {
    [key in string]: string;
};

const isOnlyMissingCid = R.pipe(Object.keys, (info: string[]) => MISSING_CID.every(bit => info.includes(bit)));

export const part1 = R.pipe((passports: Passport[]) => passports.filter(isOnlyMissingCid), R.length);

export const part2 = R.pipe(
    (passports: Passport[]) =>
        passports.filter(
            R.allPass([
                isOnlyMissingCid,
                R.propSatisfies(R.pipe(Number, R.allPass([R.gte(R.__, 1920), R.lte(R.__, 2002)])), 'byr'),
                R.propSatisfies(R.pipe(Number, R.allPass([R.gte(R.__, 2010), R.lte(R.__, 2020)])), 'iyr'),
                R.propSatisfies(R.pipe(Number, R.allPass([R.gte(R.__, 2020), R.lte(R.__, 2030)])), 'eyr'),
                R.propSatisfies((x: string) => {
                    const height = Number(/\d+/.exec(x)![0]);

                    if (x.endsWith('cm')) {
                        return height >= 150 && height <= 193;
                    } else if (x.endsWith('in')) {
                        return height >= 59 && height <= 76;
                    } else {
                        return false;
                    }
                }, 'hgt'),
                R.propSatisfies(R.test(/^#[0-9a-f]{6}$/), 'hcl'),
                R.propSatisfies(R.test(/^amb|blu|brn|gry|grn|hzl|oth$/), 'ecl'),
                R.propSatisfies(R.test(/^[\d]{9}$/), 'pid'),
            ]),
        ),
    R.length,
);

export const parse = R.pipe(
    R.split('\n\n'),
    R.map(R.pipe(R.split('\n'), R.join(' '), R.split(' '))),
    R.map(
        R.reduce((passport, information) => {
            const [name, value] = information.split(':');

            return {
                ...passport,
                [name]: value,
            };
        }, {}),
    ),
);

export const run = () => {
    const input = loadRawInput('2020-04');
    const passports = parse(input);

    console.log('Part 1:', part1(passports));
    console.log('Part 2:', part2(passports));
};
