import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const reminderKey = 'phone';

function _listPhoneTime(){
    let reminderstring = localStorage.getItem(reminderKey);
    let reminders = reminderstring ? JSON.parse(reminderstring) : [];
    return reminders;
}

export function listPhoneTime(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listPhoneTime());
        }, 100);
    });
}

function _createPhoneTime(date, diff){
    //localStorage.clear();
    const newReminder = {
        date: date,
        diff: diff,
        ts: moment().unix()
    }
    const reminders = [
        newReminder,
        ..._listPhoneTime()
    ];
    localStorage.setItem(reminderKey, JSON.stringify(reminders));
    return newReminder;
}

export function createPhoneTime(date, text){
    return new Promise((resolve, reject) => {
        resolve(_createPhoneTime(date, text));
    });
}