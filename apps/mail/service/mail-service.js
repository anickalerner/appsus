import { storageService } from '../../../service/storage-service.js';
import { filterService } from './filter-service.js';
import { utilService } from '../../../service/util-service.js'

export const mailService = {
    query,
    getMailIndexById,
    updateMailProperty,
    updateMail,
    addMail,
    deleteMail,
    getUnreadMailsCount
}
var mails = [
    {
        from: 'ebay',
        subject: '✅ ORDER CONFIRMED: D\'Andrea Guitar Pick..',
        body: 'Thanks for your purchase, Anna! Your order is confirmed. We’ll let you know when it’s on the way.In the meantime, we have more things you’ll love at unbeatable prices!'
        , isRead: false, sentAt: 1551133930594
        , isStarred: true
    }
    , {
        from: 'Dropbox',
        subject: 'You deleted 3034 files from Dropbox',
        body: 'Hi Anna You recently deleted 3034 files from your Dropbox account.If you want these files back, you can still restore them until 16/9/2020.After that, they’ll be permanently deleted.'
        , isRead: false, sentAt: 1598437561148
    }
    , {
        from: 'Gett',
        subject: 'Your Thursday night ride with Gett'
        , body: 'Hi Anna, Thanks for using Gett! YOUR RIDE ID 1253858834'
        , isRead: false
        , sentAt: 1598437663925
    }
];
const MAIL_PREF = '-MAIL';
initMails();

function getMails() {
    return storageService.loadFromStorage(MAIL_PREF);
}

function saveMails() {
    storageService.saveToStorage(MAIL_PREF, mails);
    return Promise.resolve('saved');
}

function initMails() {
    var storedMails = getMails();
    if (!storedMails) {
        storedMails = mails.map(mail => {
            mail.id = utilService.makeId();
            mail.isStarred = (mail.isStarred) ? mail.isStarred : false;
            return mail;
        });
    }
    mails = storedMails;
    saveMails();
}

function query(filter, filteredByRead) {
    return Promise.resolve(filterService.filterMails(mails, filter, filteredByRead));
}

function getMailIndexById(mailId) {
    return Promise.resolve(mails.findIndex(mail => mail.id === mailId));
}

function updateMailProperty(id, propObj) {
    return getMailIndexById(id).then(mailInd => {
        var mailToUpdate = mails[mailInd];
        Object.assign(mailToUpdate, propObj);
        updateMail(mailInd, mailToUpdate);
    });

}

function updateMail(mailId, mail) {
    mails[mailId] = mail;
    saveMails();
    return Promise.resolve('updated mail');
}

const MY_MAIL = 'anicka.lerner@gmail.com';

function addMail(data) {
    var newMail = {
        ...data
        , from: MY_MAIL
        , sentAt: Date.now()
    };
    if (!newMail.id || newMail.id === '') {
        newMail.id = utilService.makeId();
    }
    mails = [...mails, newMail];
    saveMails();
    return Promise.resolve(newMail);

}

function deleteMail(id) {
    return getMailIndexById(id).then((ind) => {
        mails.splice(ind, 1);
        console.log(mails);
        saveMails();
    });
}

function getUnreadMailsCount() {
    return mails.filter(mail => !mail.isRead).length;
}