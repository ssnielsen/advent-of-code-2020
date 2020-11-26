import * as R from 'ramda';

import * as Util from '../util';

type State = {
    direction: Direction;
    x: number;
    y: number;
};

type Direction = 'N' | 'E' | 'S' | 'W';

const initialState: State = {
    direction: 'N',
    x: 0,
    y: 0,
};

type Instruction =
    | {
          type: 'turn';
          turn: 'R' | 'L';
      }
    | {
          type: 'walk';
      };

const nextDirection = (
    current: Direction,
    turn: Extract<Instruction, {type: 'turn'}>['turn'],
): Direction => {
    switch (current) {
        case 'N':
            return turn === 'R' ? 'E' : 'W';
        case 'E':
            return turn === 'R' ? 'S' : 'N';
        case 'S':
            return turn === 'R' ? 'W' : 'E';
        case 'W':
            return turn === 'R' ? 'N' : 'S';
    }
};

const nextCoordinate = (
    x: number,
    y: number,
    distance: number,
    direction: Direction,
) => {
    switch (direction) {
        case 'N':
            return {
                x,
                y: y + distance,
            };
        case 'E':
            return {
                x: x + distance,
                y,
            };
        case 'S':
            return {
                x,
                y: y - distance,
            };
        case 'W':
            return {
                x: x - distance,
                y,
            };
    }
};

const nextState = (current: State, instruction: Instruction): State => {
    switch (instruction.type) {
        case 'turn': {
            const directionAfterTurning = nextDirection(
                current.direction,
                instruction.turn,
            );

            return {
                ...current,
                direction: directionAfterTurning,
            };
        }
        case 'walk': {
            const stateAfterWalking = {
                direction: current.direction,
                ...nextCoordinate(current.x, current.y, 1, current.direction),
            };

            return stateAfterWalking;
        }
    }
};

export const part1 = (instructions: Instruction[]) => {
    const finalState = R.reduce(nextState, initialState, instructions);
    const distanceFromOrigin = Math.abs(finalState.x) + Math.abs(finalState.y);

    return distanceFromOrigin;
};

export const part2 = (instructions: Instruction[]) => {
    const allStates = R.reduce(
        ({history, result}, instruction) => {
            const [latest] = history;
            const newState = nextState(latest, instruction);
            const newHistory = [newState, ...history];

            switch (instruction.type) {
                case 'turn':
                    return {
                        history: newHistory,
                        result,
                    };
                case 'walk': {
                    if (result !== null) {
                        return {
                            history: newHistory,
                            result,
                        };
                    }

                    const visitedTwice = R.find(
                        ({x, y}) => newState.x === x && newState.y === y,
                        history,
                    );
                    const distance = visitedTwice
                        ? Math.abs(visitedTwice.x) + Math.abs(visitedTwice.y)
                        : null;

                    return {
                        history: [newState, ...history],
                        result: distance,
                    };
                }
            }
        },
        {history: [initialState], result: null as number | null},
        instructions,
    );

    return allStates.result;
};

const parseInstruction = (s: string): Instruction[] => {
    const [turn, ...distance] = s;

    return [
        {type: 'turn', turn: turn as any},
        ...R.repeat({type: 'walk' as const}, Number(distance.join(''))),
    ];
};

export const parse = (s: string): Instruction[] => {
    const instructions = R.pipe(
        R.split(','),
        R.map(R.pipe(R.trim, parseInstruction)),
        R.flatten,
    )(s);

    return instructions;
};

export const run = () => {
    const inputData = Util.loadInput('2016-01')[0];
    const instructions = parse(inputData);

    console.log('Part 1:', part1(instructions));
    console.log('Part 2:', part2(instructions));
};
