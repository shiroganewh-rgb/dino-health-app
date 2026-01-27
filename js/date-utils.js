/**
 * 日付処理ユーティリティ
 * 仮想日付システム（AM4:00切り替え）を共通化
 */

/**
 * 仮想日付を取得（AM4:00に日付が切り替わる）
 * @returns {Date} 仮想的な現在日時
 */
function getVirtualDate() {
    const now = new Date();
    now.setHours(now.getHours() - 4);
    return now;
}

/**
 * 日付をYYYY-MM-DD形式の文字列に変換
 * @param {Date} date - 日付オブジェクト
 * @returns {string} YYYY-MM-DD形式の文字列
 */
function getDateString(date) {
    return date.toISOString().split('T')[0];
}

/**
 * 仮想日付の文字列を取得
 * @returns {string} YYYY-MM-DD形式の仮想日付
 */
function getTodayString() {
    return getDateString(getVirtualDate());
}

/**
 * 日付を日本語表記でフォーマット
 * @param {Date|string} date - 日付オブジェクトまたはYYYY-MM-DD文字列
 * @returns {string} 日本語形式の日付（例: "2026年1月27日"）
 */
function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * 日付を曜日付きで日本語表記
 * @param {Date|string} date - 日付オブジェクトまたはYYYY-MM-DD文字列
 * @returns {string} 日本語形式の日付（例: "2026年1月27日（月）"）
 */
function formatDateWithWeekday(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
    });
}

/**
 * 2つの日付が同じ日かチェック
 * @param {Date|string} date1 - 日付1
 * @param {Date|string} date2 - 日付2
 * @returns {boolean} 同じ日ならtrue
 */
function isSameDay(date1, date2) {
    const d1 = typeof date1 === 'string' ? date1 : getDateString(date1);
    const d2 = typeof date2 === 'string' ? date2 : getDateString(date2);
    return d1 === d2;
}

/**
 * 2つの日付間の日数差を計算
 * @param {Date|string} date1 - 開始日
 * @param {Date|string} date2 - 終了日
 * @returns {number} 日数差（date2 - date1）
 */
function getDaysDifference(date1, date2) {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// エクスポート（モジュール形式とグローバル変数の両対応）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getVirtualDate,
        getDateString,
        getTodayString,
        formatDate,
        formatDateWithWeekday,
        isSameDay,
        getDaysDifference
    };
}
