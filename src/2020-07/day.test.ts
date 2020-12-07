import * as R from 'ramda';

import {part1, part2, parse} from './day';

const testData = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`;

const otherTestData = `
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
`;

describe('Day 01', () => {
    describe('Part 1', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part1)(testData),
            ).toEqual(4);
        });
    });

    describe('Part 2', () => {
        it('works with test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part2)(testData),
            ).toEqual(32);
        });

        it('works with the other test data', () => {
            expect(
                R.pipe(R.trim, R.split('\n'), parse, part2)(otherTestData),
            ).toEqual(126);
        });
    });
});
