import * as R from 'ramda';
import {loadInput} from '../util';

type Direction = 'N' | 'S' | 'E' | 'W';
type Turn = 'L' | 'R';
type Action = Direction | Turn | 'F';
type Instruction = {
    action: Action;
    value: number;
};

type State = {
    facing: Direction;
    east: number;
    north: number;
};

const directionAfterTurning = (
    currentDirection: Direction,
    turn: Turn,
    value: number,
): Direction => {
    if (value !== 90 && value !== 180 && value !== 270) {
        throw Error(`Found unvalid value "${value}"`);
    }

    switch (currentDirection) {
        case 'N':
            switch (turn) {
                case 'L':
                    switch (value) {
                        case 90:
                            return 'W';
                        case 180:
                            return 'S';
                        case 270:
                            return 'E';
                    }
                case 'R':
                    switch (value) {
                        case 90:
                            return 'E';
                        case 180:
                            return 'S';
                        case 270:
                            return 'W';
                    }
            }
        case 'E':
            switch (turn) {
                case 'L':
                    switch (value) {
                        case 90:
                            return 'N';
                        case 180:
                            return 'W';
                        case 270:
                            return 'S';
                    }
                case 'R':
                    switch (value) {
                        case 90:
                            return 'S';
                        case 180:
                            return 'W';
                        case 270:
                            return 'N';
                    }
            }
        case 'S':
            switch (turn) {
                case 'L':
                    switch (value) {
                        case 90:
                            return 'E';
                        case 180:
                            return 'N';
                        case 270:
                            return 'W';
                    }
                case 'R':
                    switch (value) {
                        case 90:
                            return 'W';
                        case 180:
                            return 'N';
                        case 270:
                            return 'E';
                    }
            }

        case 'W':
            switch (turn) {
                case 'L':
                    switch (value) {
                        case 90:
                            return 'S';
                        case 180:
                            return 'E';
                        case 270:
                            return 'N';
                    }
                case 'R':
                    switch (value) {
                        case 90:
                            return 'N';
                        case 180:
                            return 'E';
                        case 270:
                            return 'S';
                    }
            }
    }
};

const nextStatePart1 = (
    state: State,
    instruction: Instruction,
): State => {
    const {action, value} = instruction;

    switch (action) {
        case 'N':
            return {...state, north: state.north + value};
        case 'S':
            return {...state, north: state.north - value};
        case 'E':
            return {...state, east: state.east + value};
        case 'W':
            return {...state, east: state.east - value};
        case 'L':
        case 'R':
            return {
                ...state,
                facing: directionAfterTurning(
                    state.facing,
                    action,
                    value as Parameters<
                        typeof directionAfterTurning
                    >[2],
                ),
            };
        case 'F':
            switch (state.facing) {
                case 'N':
                    return {
                        ...state,
                        north: state.north + value,
                    };
                case 'S':
                    return {
                        ...state,
                        north: state.north - value,
                    };
                case 'E':
                    return {
                        ...state,
                        east: state.east + value,
                    };
                case 'W':
                    return {
                        ...state,
                        east: state.east - value,
                    };
            }
    }
};

export const part1 = (instructions: Instruction[]) => {
    const endState = instructions.reduce(nextStatePart1, {
        facing: 'E',
        east: 0,
        north: 0,
    });

    return (
        Math.abs(endState.north) + Math.abs(endState.east)
    );
};

type StatePart2 = {
    ship: Pick<State, 'east' | 'north'>;
    waypoint: Pick<State, 'east' | 'north'>;
};

const degToRad = (degrees: number) => {
    return degrees * (Math.PI / 180);
};

const rotateWaypoint = (
    state: StatePart2,
    turn: 'R' | 'L',
    value: number,
) => {
    if (value !== 90 && value !== 180 && value !== 270) {
        throw Error(`Found unvalid value "${value}"`);
    }

    const radians = degToRad(turn === 'L' ? value : -value);
    const s = Math.sin(radians);
    const c = Math.cos(radians);

    const rotated = {
        north: Math.round(
            state.waypoint.east * s +
                state.waypoint.north * c,
        ),
        east: Math.round(
            state.waypoint.east * c -
                state.waypoint.north * s,
        ),
    };

    return rotated;
};

const nextStatePart2 = (
    state: StatePart2,
    instruction: Instruction,
): StatePart2 => {
    const {action, value} = instruction;

    switch (action) {
        case 'N':
            return {
                ...state,
                waypoint: {
                    ...state.waypoint,
                    north: state.waypoint.north + value,
                },
            };
        case 'S':
            return {
                ...state,
                waypoint: {
                    ...state.waypoint,
                    north: state.waypoint.north - value,
                },
            };
        case 'E':
            return {
                ...state,
                waypoint: {
                    ...state.waypoint,
                    east: state.waypoint.east + value,
                },
            };
        case 'W':
            return {
                ...state,
                waypoint: {
                    ...state.waypoint,
                    east: state.waypoint.east - value,
                },
            };
        case 'R':
        case 'L':
            return {
                ...state,
                waypoint: rotateWaypoint(
                    state,
                    action,
                    value,
                ),
            };
        case 'F':
            return {
                ...state,
                ship: {
                    north:
                        state.ship.north +
                        value * state.waypoint.north,
                    east:
                        state.ship.east +
                        value * state.waypoint.east,
                },
            };
    }
};

export const part2 = (instructions: Instruction[]) => {
    const endState = instructions.reduce(nextStatePart2, {
        ship: {
            east: 0,
            north: 0,
        },
        waypoint: {
            east: 10,
            north: 1,
        },
    });

    return (
        Math.abs(endState.ship.north) +
        Math.abs(endState.ship.east)
    );
};

export const parse: (
    input: string[],
) => Instruction[] = R.pipe(
    R.map((line: string) => {
        const [action, ...value] = line;

        return {
            action: action as Action,
            value: Number(value.join('')),
        };
    }),
);

export const run = () => {
    const input = loadInput('2020-12');
    const instructions = parse(input);

    console.log('Part 1:', part1(instructions));
    console.log('Part 2:', part2(instructions));
};
