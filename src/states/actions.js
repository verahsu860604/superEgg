/* weather */

// function startGetWeather(location) {
//     return {
//         type: '@WEATHER/START_GET_WEATHER',
//         location
//     };
// }

// function endGetWeather(location,code,temp) {
//     return {
//         type: '@WEATHER/END_GET_WEATHER',
//         location,
//         code,
//         temp,
//     };
// }

// export function getWeather(location) {
//     return (dispatch, getState) => {
//         dispatch(startGetWeather(location));

//         return getWeatherFromApi(location).then(weather => {
//             const {location, code, temp} = weather;
//             dispatch(endGetWeather(location, code, temp));
//         }).catch(err => {
//             console.error('Error getting weather', err);
//             dispatch(resetWeather());
//         });
//     };
// };

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
