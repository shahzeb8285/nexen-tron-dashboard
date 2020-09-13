export const PROFILE_UPDATED = 'PROFILE_UPDATED';

export function updateProfile(data) {

    return {
        type: PROFILE_UPDATED,
        data
    };
}


