import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const reminderKey = 'sleep';

function _listSleepTime(){
    let reminderstring = localStorage.getItem(reminderKey);
    let reminders = reminderstring ? JSON.parse(reminderstring) : [];
    return reminders;
}

export function listSleepTime(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listSleepTime());
        }, 500);
    });
}

function _createSleepTime(date, end, diff){
    //localStorage.clear();
    const newReminder = {
        date: date,
        diff: diff,
        end: end,
        ts: moment().unix()
    }
    //const newReminder = [date, diff];
    const reminders = [
        newReminder,
        ..._listSleepTime()
    ];
    localStorage.setItem(reminderKey, JSON.stringify(reminders));
    return newReminder;
}

export function createSleepTime(date, end, text){
    return new Promise((resolve, reject) => {
        resolve(_createSleepTime(date, end, text));
    });
}