export const mailService ={
    query
}
var mails = [
    {
        from: 'ebay',
        subject: '✅ ORDER CONFIRMED: D\'Andrea Guitar Pick..',
        body: 'Thanks for your purchase, Anna! Your order is confirmed. We’ll let you know when it’s on the way.In the meantime, we have more things you’ll love at unbeatable prices!'
        , isRead: false, sentAt: 1551133930594
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
        , isRead: false, sentAt: 1598437663925
    }
]

import { storageService} from '../../../service/storage-service.js';

function query() {
    var storedMails = storageService.loadFromStorage('-MAIL');
    //var storedMails = null;
    if (!storedMails) {
        storageService.saveToStorage('-MAIL', mails);
        storedMails = mails;
    }
    return Promise.resolve(storedMails);
}