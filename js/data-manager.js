/**
 * 恐竜データ管理モジュール
 * 恐竜種の定義と成長システムの管理
 */

// dinosaur-species.jsのデータをインポートして拡張
// このファイルは既存のdinosaur-species.jsと共存し、追加機能を提供

/**
 * 成長段階を取得
 * @param {number} consecutiveDays - 連続記録日数
 * @returns {number} 成長段階 (0-3)
 */
function getStageFromDays(consecutiveDays) {
    if (consecutiveDays >= 22) return 3; // 大人
    if (consecutiveDays >= 8) return 2;  // 子供
    if (consecutiveDays >= 1) return 1;  // 赤ちゃん
    return 0; // タマゴ
}

/**
 * 次の成長段階までの日数を取得
 * @param {number} consecutiveDays - 連続記録日数
 * @returns {number|null} 次の段階までの日数、最終段階ならnull
 */
function getDaysToNextStage(consecutiveDays) {
    if (consecutiveDays >= 22) return null;
    if (consecutiveDays >= 8) return 22 - consecutiveDays;
    if (consecutiveDays >= 1) return 8 - consecutiveDays;
    return 1 - consecutiveDays;
}

/**
 * 成長情報を取得
 * @param {string} speciesId - 恐竜種ID
 * @param {number} consecutiveDays - 連続記録日数
 * @returns {Object} 成長情報
 */
function getGrowthInfo(speciesId, consecutiveDays) {
    if (typeof DINOSAUR_SPECIES === 'undefined') {
        console.error('DINOSAUR_SPECIES is not defined. Include dinosaur-species.js first.');
        return null;
    }

    const species = DINOSAUR_SPECIES[speciesId];
    if (!species) {
        console.error(`Species ${speciesId} not found`);
        return null;
    }

    const stage = getStageFromDays(consecutiveDays);
    const stageInfo = species.stages[stage];
    const daysToNext = getDaysToNextStage(consecutiveDays);

    return {
        stage,
        stageName: stageInfo.name,
        image: stageInfo.image,
        daysToNext,
        isMaxStage: stage === 3,
        speciesName: species.name
    };
}

/**
 * 初期成長データを作成
 * @param {string} speciesId - 恐竜種ID
 * @returns {Object} 初期成長データ
 */
function createInitialGrowthData(speciesId) {
    // date-utils.jsのgetTodayString()を使用
    const today = typeof getTodayString === 'function' ? getTodayString() : new Date().toISOString().split('T')[0];

    return {
        selectedDinosaur: speciesId,
        consecutiveDays: 0,
        lastRecordDate: null,
        selectionDate: today,
        currentStage: 0
    };
}

/**
 * 成長データを更新
 * @param {Object} growthData - 現在の成長データ
 * @param {string} recordDate - 記録日 (YYYY-MM-DD)
 * @returns {Object} 更新された成長データと成長フラグ
 */
function updateGrowthData(growthData, recordDate) {
    const newData = { ...growthData };
    const oldStage = newData.currentStage;

    // 連続記録日数の更新
    if (newData.lastRecordDate) {
        // 前日の記録かチェック
        const lastDate = new Date(newData.lastRecordDate);
        const currentDate = new Date(recordDate);
        const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            newData.consecutiveDays += 1;
        } else if (diffDays > 1) {
            // 連続が途切れた
            newData.consecutiveDays = 1;
        }
        // diffDays === 0 (同日) の場合は何もしない
    } else {
        // 初回記録
        newData.consecutiveDays = 1;
    }

    newData.lastRecordDate = recordDate;
    newData.currentStage = getStageFromDays(newData.consecutiveDays);

    const didGrow = newData.currentStage > oldStage;

    return {
        data: newData,
        didGrow,
        oldStage,
        newStage: newData.currentStage
    };
}

/**
 * 30日サイクルのチェック
 * @param {Object} growthData - 成長データ
 * @param {string} currentDate - 現在日付 (YYYY-MM-DD)
 * @returns {boolean} リセットが必要ならtrue
 */
function shouldResetCycle(growthData, currentDate) {
    if (!growthData || !growthData.selectionDate) return false;

    const startDate = new Date(growthData.selectionDate);
    const today = new Date(currentDate);
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    return diffDays >= 30;
}

/**
 * 図鑑データを更新
 * @param {string} speciesId - 恐竜種ID
 * @param {number} maxStage - 到達した最大段階
 */
function updateEncyclopediaEntry(speciesId, maxStage) {
    // storage-utils.jsを使用
    if (typeof getEncyclopedia !== 'function' || typeof saveEncyclopedia !== 'function') {
        console.error('storage-utils.js is not loaded');
        return;
    }

    const encyclopedia = getEncyclopedia();

    if (!encyclopedia[speciesId] || encyclopedia[speciesId].maxStage < maxStage) {
        encyclopedia[speciesId] = { maxStage };
        saveEncyclopedia(encyclopedia);
    }
}

/**
 * サイクル完了時の図鑑更新
 * @param {Object} growthData - 成長データ
 */
function completeCurrentCycle(growthData) {
    if (growthData && growthData.selectedDinosaur) {
        updateEncyclopediaEntry(
            growthData.selectedDinosaur,
            growthData.currentStage
        );
    }
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getStageFromDays,
        getDaysToNextStage,
        getGrowthInfo,
        createInitialGrowthData,
        updateGrowthData,
        shouldResetCycle,
        updateEncyclopediaEntry,
        completeCurrentCycle
    };
}
