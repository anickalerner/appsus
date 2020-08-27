export const filterService = {
    filterMails
}

function filterByStarred(mail) {
    return mail.isStarred;
}

function filterByRead(mail) {
    return mail.isRead;
}

function filterBySent(mail) {
    return mail.isSent;
}

function filterByDrafts(mail){
    return mail.isDraft;
}

function filterByAll() {
    return true;
}

function getCallbackByFilter(filter) {
    var cb = {};
    switch (filter) {
        case 'starred':
            cb = filterByStarred;
            break;
        case 'sent':
            cb = filterBySent;
            break;
        case 'read':
            cb = filterByRead;
            break;
        case 'drafts':
            cb = filterByDrafts;
            break;
        case 'inbox':
        case 'all':
        default:
            cb = filterByAll;
            break;
    }
    return cb;
}

function filterMails(mails, filter){
    return mails.filter(getCallbackByFilter(filter));
}