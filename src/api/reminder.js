import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const reminderKey = 'reminders';

function _listReminders(){
    let reminderstring = localStorage.getItem(reminderKey);
    let reminders = reminderstring ? JSON.parse(reminderstring) : [];
    return reminders;
}

export function listReminders(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listReminders());
        }, 500);
    });
}

function _createReminder(text){
    const newReminder = {
        id : uuid(),
        text: text,
        ts: moment().unix()
    }
    const reminders = [
        newReminder,
        ..._listReminders()
    ];
    localStorage.setItem(reminderKey, JSON.stringify(reminders));
    return newReminder;
}

export function createReminder(text){
    return new Promise((resolve, reject) => {
        resolve(_createReminder(text));
    });
}