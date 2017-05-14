/* sleep */

export function getStartSleepTime(startSleepTime) {
    return {
        type: '@SLEEP/GET_START_SLEEP_TIME',
        startSleepTime,
    };
}

export function getEndSleepTime(endSleepTime, totalSleepTime) {
    return {
        type: '@SLEEP/GET_END_SLEEP_TIME',
        endSleepTime,
        totalSleepTime,
    }
}

export function sleepToggle(){
    return {
        type: '@SLEEP/SLEEP_TOGGLE',
    }
}

/*  phone */

export function getStartPhoneTime(startPhoneTime) {
    return {
        type: '@PHONE/GET_START_PHONE_TIME',
        startPhoneTime,
    };
}

export function getEndPhoneTime(endPhoneTime, totalPhoneTime) {
    return {
        type: '@PHONE/GET_END_PHONE_TIME',
        endPhoneTime,
    }
}

export function phoneToggle() {
    return {
        type: '@PHONE/PHONE_TOGGLE',
    }
}

/* breakFast */
export function breakFastToggle() {
    return {
        type: '@BREAKFAST/TOGGLE',
    }
}

/* login */

export function loginToggle() {
    return {
        type: '@LOGIN/LOGIN_TOGGLE',
    }
}

export function fetch_userid(userid){
    return {
        type: '@LOGIN/FETCH_USERID',
        userid,
    }
}

export function fetch_passwd(password){
    return {
        type: '@LOGIN/FETCH_PASSWD',
        password,
    }
}
