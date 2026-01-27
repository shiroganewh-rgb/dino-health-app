/**
 * アンロックシステム
 * 連続記録日数に応じた恐竜種のアンロック管理
 */

/**
 * 連続記録日数を計算
 * @param {Array} records - 体調記録の配列
 * @returns {number} 現在の連続記録日数
 */
function calculateConsecutiveDays(records) {
    if (!records || records.length === 0) return 0;

    // 日付でソート（新しい順）
    const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));

    // 仮想日付を使用
    const today = typeof getTodayString === 'function'
        ? getTodayString()
        : new Date().toISOString().split('T')[0];

    let consecutive = 0;
    let checkDate = new Date(today);

    for (let i = 0; i < sorted.length; i++) {
        const recordDate = sorted[i].date;
        const checkDateStr = checkDate.toISOString().split('T')[0];

        if (recordDate === checkDateStr) {
            consecutive++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            // 連続が途切れた
            break;
        }
    }

    return consecutive;
}

/**
 * 最大連続記録日数を計算
 * @param {Array} records - 体調記録の配列
 * @returns {number} 最大連続記録日数
 */
function calculateMaxConsecutiveDays(records) {
    if (!records || records.length === 0) return 0;

    const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));

    let maxConsecutive = 0;
    let currentConsecutive = 0;
    let lastDate = null;

    for (const record of sorted) {
        const currentDate = new Date(record.date);

        if (lastDate) {
            const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                currentConsecutive++;
            } else if (diffDays > 1) {
                maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
                currentConsecutive = 1;
            }
            // diffDays === 0 の場合は何もしない（同日記録）
        } else {
            currentConsecutive = 1;
        }

        lastDate = currentDate;
    }

    return Math.max(maxConsecutive, currentConsecutive);
}

/**
 * アンロック可能な恐竜をチェック
 * @param {number} maxConsecutiveDays - 最大連続記録日数
 * @returns {Array} 新たにアンロックされた恐竜種IDの配列
 */
function checkUnlocks(maxConsecutiveDays) {
    if (typeof DINOSAUR_SPECIES === 'undefined') {
        console.error('DINOSAUR_SPECIES is not defined');
        return [];
    }

    if (typeof getUnlockedSpecies !== 'function') {
        console.error('storage-utils.js is not loaded');
        return [];
    }

    const unlockedSpecies = getUnlockedSpecies();
    const newUnlocks = [];

    for (const [id, species] of Object.entries(DINOSAUR_SPECIES)) {
        // すでにアンロック済みならスキップ
        if (unlockedSpecies.includes(id)) continue;

        // 公開されていない、または初期解放ならスキップ
        if (!species.isAvailable || species.unlockCondition === null) continue;

        // アンロック条件を満たしているかチェック
        if (maxConsecutiveDays >= species.unlockCondition) {
            newUnlocks.push(id);
        }
    }

    // 新たにアンロックされた恐竜を保存
    if (newUnlocks.length > 0) {
        const updated = [...unlockedSpecies, ...newUnlocks];
        saveUnlockedSpecies(updated);
    }

    return newUnlocks;
}

/**
 * 初期解放の恐竜を初期化
 */
function initializeUnlockedSpecies() {
    if (typeof DINOSAUR_SPECIES === 'undefined' || typeof getUnlockedSpecies !== 'function') {
        return;
    }

    const unlocked = getUnlockedSpecies();

    // 初回起動時のみ、初期解放恐竜を追加
    if (unlocked.length === 0) {
        const initialSpecies = Object.entries(DINOSAUR_SPECIES)
            .filter(([id, species]) => species.isAvailable && species.unlockCondition === null)
            .map(([id]) => id);

        if (initialSpecies.length > 0) {
            saveUnlockedSpecies(initialSpecies);
        }
    }
}

/**
 * アンロック通知を表示
 * @param {string} speciesId - 恐竜種ID
 */
function showUnlockNotification(speciesId) {
    if (typeof DINOSAUR_SPECIES === 'undefined') return;

    const species = DINOSAUR_SPECIES[speciesId];
    if (!species) return;

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        text-align: center;
        animation: unlockPop 0.5s ease-out;
    `;

    notification.innerHTML = `
        <style>
            @keyframes unlockPop {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        </style>
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
        <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;">新しい恐竜がアンロック！</h2>
        <p style="margin: 0; font-size: 1.2rem; font-weight: 600;">${species.name}</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.9;">${species.description}</p>
        <button onclick="this.parentElement.remove()" 
                style="margin-top: 1.5rem; background: white; color: #667eea; border: none; 
                       padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; 
                       cursor: pointer; font-size: 1rem;">
            確認
        </button>
    `;

    document.body.appendChild(notification);

    // 10秒後に自動で消える
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 10000);
}

/**
 * 記録後のアンロックチェック
 * @param {Array} records - 体調記録の配列
 */
function checkAndNotifyUnlocks(records) {
    const maxConsecutive = calculateMaxConsecutiveDays(records);
    const currentMaxStored = getMaxConsecutiveDays();

    // 最大記録を更新
    if (maxConsecutive > currentMaxStored) {
        saveMaxConsecutiveDays(maxConsecutive);

        // アンロックチェック
        const newUnlocks = checkUnlocks(maxConsecutive);

        // 通知表示
        newUnlocks.forEach((speciesId, index) => {
            setTimeout(() => {
                showUnlockNotification(speciesId);
            }, index * 500); // 複数ある場合は0.5秒ずつずらして表示
        });
    }
}

/**
 * 選択可能な恐竜リストを取得
 * @returns {Array} 選択可能な恐竜種の配列
 */
function getSelectableSpecies() {
    if (typeof DINOSAUR_SPECIES === 'undefined' || typeof getUnlockedSpecies !== 'function') {
        return [];
    }

    const unlocked = getUnlockedSpecies();

    return Object.values(DINOSAUR_SPECIES)
        .filter(species => species.isAvailable && unlocked.includes(species.id));
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateConsecutiveDays,
        calculateMaxConsecutiveDays,
        checkUnlocks,
        initializeUnlockedSpecies,
        showUnlockNotification,
        checkAndNotifyUnlocks,
        getSelectableSpecies
    };
}
