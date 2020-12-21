import * as R from 'ramda';
import {loadInput} from '../util';

type Instruction =
    | {type: 'mask'; mask: string}
    | {type: 'write'; address: number; value: bigint};

type Memory = {
    [address: number]: bigint;
};

type State = {
    memory: Memory;
};

export const part1 = (instructions: Instruction[]) => {
    const finalState = instructions.reduce(
        (state, instruction) => {
            switch (instruction.type) {
                case 'mask':
                    return {
                        ...state,
                        mask: instruction.mask,
                    };
                case 'write': {
                    const {address, value} = instruction;

                    const orMask = state.mask
                        .split('')
                        .map(char =>
                            char === 'X' ? '0' : char,
                        )
                        .join('');
                    const andMask = state.mask
                        .split('')
                        .map(char =>
                            char === 'X' || char === '1'
                                ? '1'
                                : char,
                        )
                        .join('');

                    const valueAfterMask =
                        (value &
                            BigInt(parseInt(andMask, 2))) |
                        BigInt(parseInt(orMask, 2));

                    return {
                        ...state,
                        memory: {
                            ...state.memory,
                            [address]: valueAfterMask,
                        },
                    };
                }
            }
        },
        {
            mask: '',
            memory: {},
        },
    );

    return R.values(finalState.memory)
        .map(Number)
        .reduce((acc, elem) => acc + elem, 0);
};

const findPermutations = (bitString: string): string[] => {
    if (!bitString.includes('X')) {
        return [bitString];
    } else {
        return R.flatten(
            ['1', '0'].map(replacing => {
                const replaced = bitString.replace(
                    'X',
                    replacing,
                );

                return findPermutations(replaced);
            }),
        );
    }
};

export const part2 = (instructions: Instruction[]) => {
    const finalState = instructions.reduce(
        (state, instruction, index) => {
            console.log(
                `Doing ${index} of ${instructions.length}`,
            );
            switch (instruction.type) {
                case 'mask':
                    return {
                        ...state,
                        mask: instruction.mask,
                    };
                case 'write': {
                    const {address, value} = instruction;

                    const binaryString = address
                        .toString(2)
                        .padStart(36, '0');

                    const masked = R.zip(
                        R.split('', state.mask),
                        R.split('', binaryString),
                    )
                        .map(([maskChar, addressChar]) => {
                            switch (maskChar) {
                                case '1':
                                    return '1';
                                case '0':
                                    return addressChar;
                                case 'X':
                                    return 'X';
                                default:
                                    throw Error(
                                        `Unexpected char: "${maskChar}"`,
                                    );
                            }
                        })
                        .join('');

                    const allPermutations = findPermutations(
                        masked,
                    );

                    console.log(
                        'Number of permutations:',
                        allPermutations.length,
                    );

                    return {
                        ...state,
                        memory: allPermutations.reduce(
                            (memory, address) => {
                                return {
                                    ...memory,
                                    [address]: value,
                                };
                            },
                            state.memory,
                        ),
                    };
                }
            }
        },
        {
            mask: '',
            memory: {},
        },
    );

    return R.values(finalState.memory)
        .map(Number)
        .reduce((acc, elem) => acc + elem, 0);
};

export const parse = (input: string[]): Instruction[] => {
    return input.map(line => {
        if (line.startsWith('mask')) {
            const mask = line.split(' = ')[1];

            return {
                type: 'mask' as const,
                mask,
            };
        } else {
            const numbers = line.match(/(\d+)/g);

            if (!numbers) {
                throw Error('No numbers');
            }

            return {
                type: 'write' as const,
                address: Number(numbers[0]),
                value: BigInt(numbers[1]),
            };
        }
    });
};

export const run = () => {
    //     const input = R.split(
    //         '\n',
    //         R.trim(`
    // mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    // mem[8] = 11
    // mem[7] = 101
    // mem[8] = 0
    // `),
    //     );
    //     const input = R.split(
    //         '\n',
    //         R.trim(`
    // mask = 000000000000000000000000000000X1001X
    // mem[42] = 100
    // mask = 00000000000000000000000000000000X0XX
    // mem[26] = 1
    //     `),
    //     );

    const input = loadInput('2020-14');
    const instructions = parse(input);

    console.log('Part 1:', part1(instructions));
    console.log('Part 2:', part2(instructions));
};
