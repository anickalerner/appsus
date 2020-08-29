export const filterService = {
    filterMails
}

function filterByStarred(mail) {
    return mail.isStarred && !mail.isDraft;
}

function filterByRead(mail) {
    return mail.isRead && !mail.isDraft;
}

function filterByUnread(mail) {
    return !mail.isRead && !mail.isDraft;
}

function filterBySent(mail) {
    return mail.isSent && !mail.isDraft;
}

function filterByDrafts(mail) {
    return mail.isDraft;
}

function filterByAll(mail) {
    return !mail.isDraft;
}

function getCallbackByFilter(filter) {
    var cb = {};
    switch (filter.value) {
        case 'starred':
            cb = filterByStarred;
            break;
        case 'sent':
            cb = filterBySent;
            break;
        case 'read':
            cb = filterByRead;
            break;
        case 'unread':
            cb = filterByUnread;
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

function filterMails(mails, filter, filteredByRead) {
//    var byRead = filteredByRead === 'read'
    if (filter.name === 'id') {
        return [mails.find((mail) => {
            return mail.id === filter.value;
        })]
    }
    else {
        mails = mails.filter(getCallbackByFilter(filter));
        mails = mails.filter(getCallbackByFilter(filteredByRead));
        return mails;
    }
}