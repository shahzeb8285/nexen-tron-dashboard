export const WINNERS_UPDATED = 'WINNERS_UPDATED';

export function winnerActions(data) {

    return {
        type: WINNERS_UPDATED,
        data
    };
}


