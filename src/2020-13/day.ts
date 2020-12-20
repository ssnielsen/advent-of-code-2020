import * as R from 'ramda';
import {hasValue, loadInput} from '../util';

type Schedule = {
    earliestDeparture: number;
    busses: (number | 'x')[];
};

const findBus = (
    time: number,
    busses: number[],
): {departingBus: number; time: number} => {
    const departingBus = busses.find(bus => {
        return time % bus === 0;
    });

    if (departingBus) {
        return {departingBus, time};
    } else {
        return findBus(time + 1, busses);
    }
};

const onlyBusses = (slots: Schedule['busses']) => {
    return slots.filter(
        (bus): bus is number => bus !== 'x',
    );
};

export const part1 = (schedule: Schedule) => {
    const realBusses = onlyBusses(schedule.busses);

    const result = findBus(
        schedule.earliestDeparture,
        realBusses,
    );

    return (
        result.departingBus *
        (result.time - schedule.earliestDeparture)
    );
};

const findCombination = (
    time: number,
    bussesLeft: [number, number][],
    step: number,
): number => {
    const [[bus, offset], ...restOfBusses] = bussesLeft;

    if ((time + offset) % bus !== 0) {
        return findCombination(
            time + step,
            bussesLeft,
            step,
        );
    } else {
        return restOfBusses.length === 0
            ? time
            : findCombination(
                  time,
                  restOfBusses,
                  step * bus,
              );
    }
};

export const part2 = ({busses}: Schedule) => {
    const busPairs = busses
        .map((bus, index) => [bus, index] as const)
        .filter(
            (pair): pair is [number, number] =>
                pair[0] !== 'x',
        );

    return findCombination(
        0,
        busPairs.slice(1),
        busPairs[0]![0],
    );
};

export const parse = (input: string) => {
    return R.pipe(
        R.trim,
        R.split('\n'),
        ([earliestDeparture, busses]) => {
            return {
                earliestDeparture: Number(
                    earliestDeparture,
                ),
                busses: R.pipe(
                    R.split(','),
                    R.map(bus =>
                        bus === 'x' ? bus : Number(bus),
                    ),
                )(busses),
            };
        },
    )(input);
};

const input = `
1000655
17,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,571,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,x,23,x,x,x,x,x,29,x,401,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,19
`;

export const run = () => {
    const schedule = parse(input);

    console.log('Part 1:', part1(schedule));
    console.log('Part 2:', part2(schedule));
};
