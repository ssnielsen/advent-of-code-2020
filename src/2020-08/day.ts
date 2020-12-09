import * as R from 'ramda';
import {hasValue, loadInput} from '../util';

type Instruction = {operation: 'acc' | 'jmp' | 'nop'; argument: number};

type Program = Instruction[];

type State = {
    position: number;
    history: number[];
    accumulator: number;
};

type Result = {status: 'loop' | 'reached-end'; accumulator: number};

const nextState = (instruction: Instruction, state: State): State => {
    const {position, history, accumulator} = state;

    const newHistory = [...history, position];

    switch (instruction.operation) {
        case 'acc':
            return {
                position: position + 1,
                accumulator: accumulator + instruction.argument,
                history: newHistory,
            };
        case 'jmp':
            return {
                position: position + instruction.argument,
                accumulator,
                history: newHistory,
            };
        case 'nop':
            return {
                position: position + 1,
                accumulator,
                history: newHistory,
            };
    }
};

const runProgram = (
    program: Program,
    state: State = {position: 0, accumulator: 0, history: []},
): Result => {
    const {position, history, accumulator} = state;

    if (history.includes(position)) {
        return {status: 'loop', accumulator};
    }

    if (position === program.length) {
        return {status: 'reached-end', accumulator};
    }

    const instruction = program[position];

    if (!instruction) {
        throw Error(`No instruction at position "${position}"`);
    }

    return runProgram(program, nextState(instruction, state));
};

export const part1 = (program: Program) => {
    return runProgram(program).accumulator;
};

export const part2 = (program: Program) => {
    return program
        .map((instruction, index) => {
            if (
                instruction.operation !== 'jmp' &&
                instruction.operation !== 'nop'
            ) {
                return undefined;
            }

            const newInstriction: Instruction = {
                operation: instruction.operation === 'jmp' ? 'nop' : 'jmp',
                argument: instruction.argument,
            };

            return R.update(index, newInstriction, program);
        })
        .filter(hasValue)
        .map(program => {
            return runProgram(program);
        })
        .filter(result => result.status === 'reached-end')[0].accumulator;
};

export const parse = (input: string[]): Program => {
    return R.pipe(
        R.map(
            R.pipe(
                R.split(' '),
                ([operationPart, argumentPart]) =>
                    ({
                        operation: operationPart,
                        argument: Number(argumentPart),
                    } as Instruction),
            ),
        ),
    )(input);
};

export const run = () => {
    const input = loadInput('2020-08');
    const program = parse(input);

    console.log('Part 1:', part1(program));
    console.log('Part 2:', part2(program));
};
