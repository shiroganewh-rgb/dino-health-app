/**
 * LocalStorage操作ユーティリティ
 * 安全な読み書きとエラーハンドリングを提供
 */

// ストレージキー定数
const STORAGE_KEYS = {
    HEALTH_RECORDS: 'simpleHealthRecords',
    GROWTH_DATA: 'growthData',
    ENCYCLOPEDIA: 'encyclopedia',
    UNLOCKED_SPECIES: 'unlockedSpecies',
    MAX_CONSECUTIVE: 'maxConsecutiveDays'
};

/**
 * LocalStorageから安全にデータを取得
 * @param {string} key - キー
 * @param {*} defaultValue - デフォルト値
 * @returns {*} 取得したデータまたはデフォルト値
 */
function safeGetItem(key, defaultValue) {
    try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;
        return JSON.parse(item);
    } catch (e) {
        console.error(`Error reading ${key}:`, e);
        return defaultValue;
    }
}

/**
 * LocalStorageに安全にデータを保存
 * @param {string} key - キー
 * @param {*} value - 値
 * @returns {boolean} 成功したらtrue
 */
function safeSetItem(key, value) {
    try {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.error('LocalStorage quota exceeded');
            alert('ストレージ容量が不足しています。古いデータを削除してください。');
        } else {
            console.error(`Error writing ${key}:`, e);
        }
        return false;
    }
}

/**
 * 体調記録データを取得
 * @returns {Array} 記録の配列
 */
function getHealthRecords() {
    return safeGetItem(STORAGE_KEYS.HEALTH_RECORDS, []);
}

/**
 * 体調記録データを保存
 * @param {Array} records - 記録の配列
 * @returns {boolean} 成功したらtrue
 */
function saveHealthRecords(records) {
    return safeSetItem(STORAGE_KEYS.HEALTH_RECORDS, records);
}

/**
 * 成長データを取得
 * @returns {Object|null} 成長データまたはnull
 */
function getGrowthData() {
    return safeGetItem(STORAGE_KEYS.GROWTH_DATA, null);
}

/**
 * 成長データを保存
 * @param {Object} data - 成長データ
 * @returns {boolean} 成功したらtrue
 */
function saveGrowthData(data) {
    return safeSetItem(STORAGE_KEYS.GROWTH_DATA, data);
}

/**
 * 図鑑データを取得
 * @returns {Object} 図鑑データ
 */
function getEncyclopedia() {
    return safeGetItem(STORAGE_KEYS.ENCYCLOPEDIA, {});
}

/**
 * 図鑑データを保存
 * @param {Object} data - 図鑑データ
 * @returns {boolean} 成功したらtrue
 */
function saveEncyclopedia(data) {
    return safeSetItem(STORAGE_KEYS.ENCYCLOPEDIA, data);
}

/**
 * アンロック済み恐竜種リストを取得
 * @returns {Array} 恐竜種IDの配列
 */
function getUnlockedSpecies() {
    return safeGetItem(STORAGE_KEYS.UNLOCKED_SPECIES, []);
}

/**
 * アンロック済み恐竜種リストを保存
 * @param {Array} species - 恐竜種IDの配列
 * @returns {boolean} 成功したらtrue
 */
function saveUnlockedSpecies(species) {
    return safeSetItem(STORAGE_KEYS.UNLOCKED_SPECIES, species);
}

/**
 * 最大連続記録日数を取得
 * @returns {number} 最大連続日数
 */
function getMaxConsecutiveDays() {
    return safeGetItem(STORAGE_KEYS.MAX_CONSECUTIVE, 0);
}

/**
 * 最大連続記録日数を保存
 * @param {number} days - 日数
 * @returns {boolean} 成功したらtrue
 */
function saveMaxConsecutiveDays(days) {
    return safeSetItem(STORAGE_KEYS.MAX_CONSECUTIVE, days);
}

/**
 * すべてのデータをエクスポート
 * @returns {Object} すべてのデータ
 */
function exportAllData() {
    return {
        healthRecords: getHealthRecords(),
        growthData: getGrowthData(),
        encyclopedia: getEncyclopedia(),
        unlockedSpecies: getUnlockedSpecies(),
        maxConsecutiveDays: getMaxConsecutiveDays(),
        exportDate: new Date().toISOString()
    };
}

/**
 * データをインポート
 * @param {Object} data - インポートするデータ
 * @returns {boolean} 成功したらtrue
 */
function importAllData(data) {
    try {
        if (data.healthRecords) saveHealthRecords(data.healthRecords);
        if (data.growthData) saveGrowthData(data.growthData);
        if (data.encyclopedia) saveEncyclopedia(data.encyclopedia);
        if (data.unlockedSpecies) saveUnlockedSpecies(data.unlockedSpecies);
        if (data.maxConsecutiveDays !== undefined) saveMaxConsecutiveDays(data.maxConsecutiveDays);
        return true;
    } catch (e) {
        console.error('Error importing data:', e);
        return false;
    }
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STORAGE_KEYS,
        safeGetItem,
        safeSetItem,
        getHealthRecords,
        saveHealthRecords,
        getGrowthData,
        saveGrowthData,
        getEncyclopedia,
        saveEncyclopedia,
        getUnlockedSpecies,
        saveUnlockedSpecies,
        getMaxConsecutiveDays,
        saveMaxConsecutiveDays,
        exportAllData,
        importAllData
    };
}
