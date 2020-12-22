import * as R from 'ramda';
import {loadInput} from '../util';

type Rule = {
    name: string;
    ranges: {
        from: number;
        to: number;
    }[];
};

type Ticket = number[];

export const part1 = (
    rules: Rule[],
    nearbyTickets: Ticket[],
) => {
    const erroredValues = nearbyTickets.map(ticket => {
        return (
            ticket.find(value => {
                const passesAllRules = rules.some(rule => {
                    const passesSomeRange = rule.ranges.some(
                        range => {
                            const passesRange =
                                value >= range.from &&
                                value <= range.to;

                            return passesRange;
                        },
                    );

                    return passesSomeRange;
                });

                return !passesAllRules;
            }) ?? 0
        );
    });

    return R.sum(erroredValues);
};

export const part2 = (
    rules: Rule[],
    myTicket: Ticket,
    nearbyTickets: Ticket[],
) => {
    // Filter out bad tickets
    const validTickets = nearbyTickets.filter(ticket => {
        return ticket.every(value => {
            const passesAllRules = rules.some(rule => {
                const passesSomeRange = rule.ranges.some(
                    range => {
                        const passesRange =
                            value >= range.from &&
                            value <= range.to;

                        return passesRange;
                    },
                );

                return passesSomeRange;
            });

            return passesAllRules;
        });
    });

    // Transpose the ticket array (incl. my ticket)
    // such that each inner array now contains the former columns
    const transposedTickets = R.transpose([
        myTicket,
        ...validTickets,
    ]);

    // Find matching candidates
    const matchedFields = transposedTickets
        .map((column, index) => {
            const foundRules = rules.filter(rule => {
                return column.every(value => {
                    return rule.ranges.some(range => {
                        return (
                            value >= range.from &&
                            value <= range.to
                        );
                    });
                });
            });

            return {
                column,
                foundRules,
                index,
            };
        })
        // Sort by number of matched rules
        // such the most restricted gets "locked in" first
        .sort(
            (matchingA, matchingB) =>
                matchingA.foundRules.length -
                matchingB.foundRules.length,
        )
        .reduce(
            ({taken, matchings}, potentialMatching) => {
                const onlyMatcing = potentialMatching.foundRules.filter(
                    rule => !taken.has(rule.name),
                );

                if (onlyMatcing.length !== 1) {
                    throw Error(
                        `Did not find good match for index ${potentialMatching.index}`,
                    );
                }

                const {name} = onlyMatcing[0];

                return {
                    taken: taken.add(name),
                    matchings: {
                        ...matchings,
                        [name]: potentialMatching.index,
                    },
                };
            },
            {
                taken: new Set<string>(),
                matchings: {} as {
                    [fieldName: string]: number;
                },
            },
        );

    const result = Object.keys(matchedFields.matchings)
        .filter(field => field.startsWith('departure'))
        .map(
            departureField =>
                myTicket[
                    matchedFields.matchings[departureField]
                ],
        )
        .reduce(R.multiply, 1);

    return result;
};

export const parse = (input: string) => {
    const [rules, myTicket, nearbyTickets] = input.split(
        '\n\n',
    );

    const parsedRules = rules.split('\n').map(rule => {
        const [from1, to1, from2, to2] = rule.match(
            /(\d+)/g,
        )!;

        return {
            name: rule.split(':')[0],
            ranges: [
                {from: Number(from1), to: Number(to1)},
                {from: Number(from2), to: Number(to2)},
            ],
        };
    });

    const parsedNearbyTickets = nearbyTickets
        .split('\n')
        .slice(1)
        .map(ticket => ticket.split(',').map(Number));

    return {
        rules: parsedRules,
        myTicket: myTicket
            .split('\n')[1]
            .split(',')
            .map(Number),
        nearbyTickets: parsedNearbyTickets,
    };
};

export const run = () => {
    const input = loadInput('2020-16');
    const parsed = parse(input.join('\n'));

    console.log(
        'Part 1:',
        part1(parsed.rules, parsed.nearbyTickets),
    );
    console.log(
        'Part 2:',
        part2(
            parsed.rules,
            parsed.myTicket,
            parsed.nearbyTickets,
        ),
    );
};
