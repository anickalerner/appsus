export const utilService = {
    makeId,
    getRandomInteger,
    copyToClipboard,
    getRandomColor
}


function makeId() {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (let i = 0; i < 10; i++) {
        id += chars.charAt(getRandomInteger(chars.length));
    }
    return id;
}

function getRandomColor() {
    let strHtml = '#';
    let chars = '0123456789abcdef';
    for (let i = 0; i < 6; i++) {
        strHtml += chars.charAt(getRandomInteger(chars.length));
    }
    return strHtml;
}

function getRandomInteger(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function copyToClipboard(str) {
    let txtEl = document.createElement('textarea')
    txtEl.value = str
    document.body.appendChild(txtEl)
    txtEl.select()
    document.execCommand('copy')
    document.body.removeChild(txtEl)
}