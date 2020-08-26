export const storageService = {
    saveToStorage,
    loadFromStorage
}

const STORAGE_PREFIX = 'APPSUS-';

function _getStorageKeyName(key) {
    return STORAGE_PREFIX + key;
}

function saveToStorage(key, val) {
    localStorage.setItem(_getStorageKeyName(key), JSON.stringify(val));
}

function loadFromStorage(key) {
    var val = localStorage.getItem(_getStorageKeyName(key));
    return JSON.parse(val);
}