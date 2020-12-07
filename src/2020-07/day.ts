import * as R from 'ramda';

import {loadInput} from '../util';

type Rule = {
    color: string;
    bags: {bag: string; count: number}[];
};

const solvePart1 = (
    rules: Rule[],
    colors: string[],
    current: string[] = [],
): string[] => {
    const foundBags = R.pipe(
        R.filter<Rule, 'array'>(
            R.pipe(
                (rule: Rule) =>
                    rule.bags.filter(bag => colors.includes(bag.bag)),
                R.map(bag => bag.bag),
                R.length,
                R.gt(R.__, 0),
            ),
        ),
    )(rules);

    if (foundBags.length === 0) {
        return current;
    } else {
        const found = foundBags.map(bag => bag.color);
        return solvePart1(rules, found, [...current, ...found]);
    }
};

const solvePart2 = (
    rules: Rule[],
    bags: {color: string; count: number}[],
): number => {
    return bags
        .map(bag => {
            const ruleForBag = rules.find(rule => rule.color === bag.color);

            if (!ruleForBag || ruleForBag.bags.length === 0) {
                return bag.count;
            } else {
                return (
                    bag.count +
                    bag.count *
                        solvePart2(
                            rules,
                            ruleForBag.bags.map(rule => ({
                                color: rule.bag,
                                count: rule.count,
                            })),
                        )
                );
            }
        })
        .reduce(R.add, 0);
};

export const part1 = (rules: Rule[]) => {
    return R.pipe(R.uniq, R.length)(solvePart1(rules, ['shiny gold']));
};

export const part2 = (rules: Rule[]) => {
    return solvePart2(rules, [{color: 'shiny gold', count: 1}]) - 1;
};

const bagRegex = /^(\d+)\s([^\.]+)\.?$/;

export const parse = R.map(
    R.pipe(R.split(' contain '), ([color, containingBags]) => {
        if (containingBags === 'no other bags.') {
            return {
                color: color.replace(' bags', ''),
                bags: [],
            };
        }

        return {
            color: color.replace(' bags', ''),
            bags: R.pipe(
                R.split(', '),
                R.map(otherBag => {
                    const parsed = otherBag.match(bagRegex);

                    if (!parsed || parsed.length !== 3) {
                        throw Error(
                            `Not good: "${otherBag}", regex result: ${parsed}`,
                        );
                    }

                    const count = Number(parsed[1]);
                    const bagOrBags = count === 1 ? ' bag' : ' bags';

                    return {
                        count,
                        bag: parsed[2].replace(bagOrBags, ''),
                    };
                }),
            )(containingBags),
        };
    }),
);

export const run = () => {
    const input = loadInput('2020-07');
    const rules = parse(input);

    console.log('Part 1:', part1(rules));
    console.log('Part 2:', part2(rules));
};
