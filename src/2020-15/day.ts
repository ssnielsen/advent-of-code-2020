import * as R from 'ramda';

type State = {
    turn: number;
    history: number[]; // Reversed (latest number first)
};

type State2 = {
    turn: number;
    latestNumber: number;
    history: Map<number, number>;
    hasSpoken: Set<number>;
};

const runPart1 = (
    state: State,
    finishAtTurn: number,
): State => {
    if (state.turn === finishAtTurn + 1) {
        return state;
    }

    const [latestNumber, ...restOfHistory] = state.history;

    const previousNumber = restOfHistory.indexOf(
        latestNumber,
    );

    return runPart1(
        {
            turn: state.turn + 1,
            history: [previousNumber + 1, ...state.history],
        },
        finishAtTurn,
    );
};

export const part1 = (turns: number) => (
    numbers: number[],
) => {
    const finalState = runPart1(
        {
            turn: numbers.length + 1,
            history: numbers.reverse(),
        },
        turns,
    );

    return finalState.history[0];
};

export const part2 = (turns: number) => (
    numbers: number[],
) => {
    const history = new Map<number, number>();

    numbers.forEach((number, index) => {
        history.set(number, index + 1);
    });

    let state: State2 = {
        turn: numbers.length + 1,
        latestNumber: numbers[numbers.length - 1],
        history,
        hasSpoken: new Set(),
    };

    while (state.turn <= turns) {
        const previousTurnForLatestNumber = state.history.get(
            state.latestNumber,
        );

        if (
            state.hasSpoken.has(state.latestNumber) &&
            previousTurnForLatestNumber
        ) {
            const nextNumber =
                state.turn -
                previousTurnForLatestNumber -
                1;

            state = {
                turn: state.turn + 1,
                latestNumber: nextNumber,
                history: state.history.set(
                    state.latestNumber,
                    state.turn - 1,
                ),
                hasSpoken: state.hasSpoken.add(nextNumber),
            };
        } else {
            state = {
                turn: state.turn + 1,
                latestNumber: 0,
                history: state.history.set(
                    state.latestNumber,
                    state.turn - 1,
                ),
                hasSpoken: state.hasSpoken.add(0),
            };
        }
    }

    return state.latestNumber;
};

export const parse = (input: string) =>
    input.split(',').map(Number);

export const run = () => {
    const input = '2,0,1,7,4,14,18';
    const numbers = parse(input);

    console.log('Part 1:', part1(2020)([...numbers]));
    console.log('Part 2:', part2(30_000_000)([...numbers]));
};
