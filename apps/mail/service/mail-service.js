import { storageService } from '../../../service/storage-service.js';
import { filterService } from './filter-service.js';
import { utilService } from '../../../service/util-service.js'

export const mailService = {
    query,
    getMailIndexById,
    updateMail
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
        , isRead: true, sentAt: 1598437561148
    }
    , {
        from: 'Gett',
        subject: 'Your Thursday night ride with Gett'
        , body: 'Hi Anna, Thanks for using Gett! YOUR RIDE ID 1253858834'
        , isRead: false, sentAt: 1598437663925
        , isDraft: true
    }
];

initMails();

function loadMails() {
    mails = storageService.loadFromStorage('-KEEP');
}

function saveMails() {
    storageService.saveToStorage('-KEEP', mails);
    return Promise.resolve('saved');
}

function initMails() {
    mails = mails.map(mail => {
        mail.id = utilService.makeId();
        mail.isStarred = (mail.isStarred) ? mail.isStarred : false;
        return mail;
    });
    saveMails();
}

function query(filter) {
    return Promise.resolve(filterService.filterMails(mails, filter));
}

function getMailIndexById(mailId) {
    return Promise.resolve(mails.findIndex(mail => mail.id === mailId));
}

function updateMail(mailId, mail) {
    mails[mailId] = mail;
    saveMails();
    return Promise.resolve('updated');
}
