// 恐竜種の定義
const DINOSAUR_SPECIES = {
    trex: {
        id: 'trex',
        isAvailable: true,
        name: 'ティラノサウルス',
        scientificName: 'Tyrannosaurus Rex',
        nickname: 'T-Rex',
        era: '白亜紀後期（約6800万〜6600万年前）',
        description: '史上最強の肉食恐竜。強力な顎と鋭い牙を持ち、圧倒的な存在感を誇ります。',
        type: 'carnivore',
        unlockCondition: null, // 初期解放
        colors: {
            primary: '#2d5016',
            secondary: '#4a7c23',
            accent: '#a53939'
        },
        cssPrefix: 'character-famicom-trex',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/trex_egg.png' },
            { name: '赤ちゃんT-Rex', minDays: 1, image: 'assets/characters/trex_baby.png' },
            { name: '子供T-Rex', minDays: 8, image: 'assets/characters/trex_child.png' },
            { name: '大人T-Rex', minDays: 22, image: 'assets/characters/trex_adult.png' }
        ]
    },

    triceratops: {
        id: 'triceratops',
        isAvailable: true,
        name: 'トリケラトプス',
        scientificName: 'Triceratops',
        nickname: 'トリケラ',
        era: '白亜紀後期（約6800万〜6600万年前）',
        description: '3本の角と大きなフリルが特徴の草食恐竜。穏やかな性格ですが、いざという時は勇敢に戦います。',
        type: 'herbivore',
        unlockCondition: null, // 初期解放
        colors: {
            primary: '#8b5a2b',
            secondary: '#cd853f',
            accent: '#ff8c00'
        },
        cssPrefix: 'character-famicom-triceratops',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/triceratops_egg.png' },
            { name: '赤ちゃんトリケラ', minDays: 1, image: 'assets/characters/triceratops_baby.png' },
            { name: '子供トリケラ', minDays: 8, image: 'assets/characters/triceratops_child.png' },
            { name: '大人トリケラ', minDays: 22, image: 'assets/characters/triceratops_adult.png' }
        ]
    },

    pteranodon: {
        id: 'pteranodon',
        isAvailable: true,
        name: 'プテラノドン',
        scientificName: 'Pteranodon',
        nickname: 'プテラ',
        era: '白亜紀後期（約8500万〜8400万年前）',
        description: '空を優雅に飛ぶ翼竜。長いくちばしと大きな翼が特徴で、自由な精神を象徴します。',
        type: 'flying',
        unlockCondition: null, // 初期解放
        colors: {
            primary: '#4682b4',
            secondary: '#87ceeb',
            accent: '#f0f8ff'
        },
        cssPrefix: 'character-famicom-pteranodon',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/pteranodon_egg.png' },
            { name: '赤ちゃんプテラ', minDays: 1, image: 'assets/characters/pteranodon_baby.png' },
            { name: '子供プテラ', minDays: 8, image: 'assets/characters/pteranodon_child.png' },
            { name: '大人プテラ', minDays: 22, image: 'assets/characters/pteranodon_adult.png' }
        ]
    },

    spinosaurus: {
        id: 'spinosaurus',
        isAvailable: true,
        name: 'スピノサウルス',
        scientificName: 'Spinosaurus',
        nickname: 'スピノ',
        era: '白亜紀前期〜後期（約1億1200万〜9700万年前）',
        description: '背中の大きな帆が特徴の肉食恐竜。半水生で魚を主食としていました。',
        type: 'carnivore',
        unlockCondition: null, // テスト用に初期解放
        colors: {
            primary: '#483d8b',
            secondary: '#6a5acd',
            accent: '#9370db'
        },
        cssPrefix: 'character-famicom-spinosaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/spinosaurus_egg.png' },
            { name: '赤ちゃんスピノ', minDays: 1, image: 'assets/characters/spinosaurus_baby.png' },
            { name: '子供スピノ', minDays: 8, image: 'assets/characters/spinosaurus_child.png' },
            { name: '大人スピノ', minDays: 22, image: 'assets/characters/spinosaurus_adult.png' }
        ]
    },

    // --- 以下、Ver 1.0.0では未公開 (isAvailable: false) ---

    styracosaurus: {
        id: 'styracosaurus',
        isAvailable: false,
        name: 'スティラコサウルス',
        scientificName: 'Styracosaurus',
        nickname: 'スティラコ',
        era: '白亜紀後期（約7500万年前）',
        description: 'フリルから伸びる長いトゲが特徴の角竜。群れで行動し、捕食者から身を守っていました。',
        type: 'herbivore',
        unlockCondition: 25,
        colors: { primary: '#d2691e', secondary: '#cd853f', accent: '#f4a460' },
        cssPrefix: 'character-famicom-styracosaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/styracosaurus_egg.png' },
            { name: '赤ちゃんスティラコ', minDays: 1, image: 'assets/characters/styracosaurus_baby.png' },
            { name: '子供スティラコ', minDays: 8, image: 'assets/characters/styracosaurus_child.png' },
            { name: '大人スティラコ', minDays: 22, image: 'assets/characters/styracosaurus_adult.png' }
        ]
    },

    quetzalcoatlus: {
        id: 'quetzalcoatlus',
        isAvailable: false,
        name: 'ケツァルコアトルス',
        scientificName: 'Quetzalcoatlus',
        nickname: 'ケツァル',
        era: '白亜紀末期（約6800万〜6600万年前）',
        description: '史上最大級の翼幅を持つ翼竜。キリンのような高い背丈で、地上を歩くこともできました。',
        type: 'flying',
        unlockCondition: 35,
        colors: { primary: '#708090', secondary: '#b0c4de', accent: '#e6e6fa' },
        cssPrefix: 'character-famicom-quetzalcoatlus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/quetzalcoatlus_egg.png' },
            { name: '赤ちゃんケツァル', minDays: 1, image: 'assets/characters/quetzalcoatlus_baby.png' },
            { name: '子供ケツァル', minDays: 8, image: 'assets/characters/quetzalcoatlus_child.png' },
            { name: '大人ケツァル', minDays: 22, image: 'assets/characters/quetzalcoatlus_adult.png' }
        ]
    },

    brachiosaurus: {
        id: 'brachiosaurus',
        isAvailable: false,
        name: 'ブラキオサウルス',
        scientificName: 'Brachiosaurus',
        nickname: 'ブラキオ',
        era: 'ジュラ紀後期（約1億5400万〜1億5300万年前）',
        description: '長い首と前脚が特徴の巨大草食恐竜。高い木の葉を食べていました。',
        type: 'herbivore',
        unlockCondition: 40,
        colors: { primary: '#8fbc8f', secondary: '#556b2f', accent: '#f0e68c' },
        cssPrefix: 'character-famicom-brachiosaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/brachiosaurus_egg.png' },
            { name: '赤ちゃんブラキオ', minDays: 1, image: 'assets/characters/brachiosaurus_baby.png' },
            { name: '子供ブラキオ', minDays: 8, image: 'assets/characters/brachiosaurus_child.png' },
            { name: '大人ブラキオ', minDays: 22, image: 'assets/characters/brachiosaurus_adult.png' }
        ]
    },

    stegosaurus: {
        id: 'stegosaurus',
        isAvailable: false,
        name: 'ステゴサウルス',
        scientificName: 'Stegosaurus',
        nickname: 'ステゴ',
        era: 'ジュラ紀後期（約1億5500万〜1億5000万年前）',
        description: '背中の板骨と尻尾のスパイクが特徴。脳は小さいが、体はとても大きい草食恐竜です。',
        type: 'herbivore',
        unlockCondition: 45,
        colors: { primary: '#2e8b57', secondary: '#3cb371', accent: '#ff6347' },
        cssPrefix: 'character-famicom-stegosaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/stegosaurus_egg.png' },
            { name: '赤ちゃんステゴ', minDays: 1, image: 'assets/characters/stegosaurus_baby.png' },
            { name: '子供ステゴ', minDays: 8, image: 'assets/characters/stegosaurus_child.png' },
            { name: '大人ステゴ', minDays: 22, image: 'assets/characters/stegosaurus_adult.png' }
        ]
    },

    ankylosaurus: {
        id: 'ankylosaurus',
        isAvailable: false,
        name: 'アンキロサウルス',
        scientificName: 'Ankylosaurus',
        nickname: 'アンキロ',
        era: '白亜紀後期（約6800万〜6600万年前）',
        description: '全身が鎧のような骨で覆われた「生きた戦車」。尻尾のハンマーで身を守ります。',
        type: 'herbivore',
        unlockCondition: 50,
        colors: { primary: '#daa520', secondary: '#b8860b', accent: '#8b4513' },
        cssPrefix: 'character-famicom-ankylosaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/ankylosaurus_egg.png' },
            { name: '赤ちゃんアンキロ', minDays: 1, image: 'assets/characters/ankylosaurus_baby.png' },
            { name: '子供アンキロ', minDays: 8, image: 'assets/characters/ankylosaurus_child.png' },
            { name: '大人アンキロ', minDays: 22, image: 'assets/characters/ankylosaurus_adult.png' }
        ]
    },

    velociraptor: {
        id: 'velociraptor',
        isAvailable: false,
        name: 'ヴェロキラプトル',
        scientificName: 'Velociraptor',
        nickname: 'ラプトル',
        era: '白亜紀後期（約7500万〜7100万年前）',
        description: '敏捷で知能が高い小型肉食恐竜。鋭い鉤爪を使い、群れで狩りをしたと考えられています。',
        type: 'carnivore',
        unlockCondition: 55,
        colors: { primary: '#cd5c5c', secondary: '#a52a2a', accent: '#ffe4b5' },
        cssPrefix: 'character-famicom-velociraptor',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/velociraptor_egg.png' },
            { name: '赤ちゃんラプトル', minDays: 1, image: 'assets/characters/velociraptor_baby.png' },
            { name: '子供ラプトル', minDays: 8, image: 'assets/characters/velociraptor_child.png' },
            { name: '大人ラプトル', minDays: 22, image: 'assets/characters/velociraptor_adult.png' }
        ]
    },

    allosaurus: {
        id: 'allosaurus',
        isAvailable: false,
        name: 'アロサウルス',
        scientificName: 'Allosaurus',
        nickname: 'アロ',
        era: 'ジュラ紀後期（約1億5500万〜1億5000万年前）',
        description: '「異なったトカゲ」を意味する大型肉食恐竜。目の上の突起が特徴的です。',
        type: 'carnivore',
        unlockCondition: 60,
        colors: { primary: '#556b2f', secondary: '#8b4513', accent: '#d2b48c' },
        cssPrefix: 'character-famicom-allosaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/trex_egg.png' },
            { name: '赤ちゃんアロ', minDays: 1, image: 'assets/characters/trex_egg.png' },
            { name: '子供アロ', minDays: 8, image: 'assets/characters/trex_egg.png' },
            { name: '大人アロ', minDays: 22, image: 'assets/characters/trex_egg.png' }
        ]
    },

    parasaurolophus: {
        id: 'parasaurolophus',
        isAvailable: false,
        name: 'パラサウロロフス',
        scientificName: 'Parasaurolophus',
        nickname: 'パラサウロ',
        era: '白亜紀後期（約7600万〜7300万年前）',
        description: '頭の後ろに伸びる長いトサカが特徴の草食恐竜。トサカで音を出して会話していたかもしれません。',
        type: 'herbivore',
        unlockCondition: 65,
        colors: { primary: '#f0e68c', secondary: '#cd853f', accent: '#ff4500' },
        cssPrefix: 'character-famicom-parasaurolophus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/triceratops_egg.png' },
            { name: '赤ちゃんパラサウロ', minDays: 1, image: 'assets/characters/triceratops_egg.png' },
            { name: '子供パラサウロ', minDays: 8, image: 'assets/characters/triceratops_egg.png' },
            { name: '大人パラサウロ', minDays: 22, image: 'assets/characters/triceratops_egg.png' }
        ]
    },

    carnotaurus: {
        id: 'carnotaurus',
        isAvailable: false,
        name: 'カルノタウルス',
        scientificName: 'Carnotaurus',
        nickname: 'カルノ',
        era: '白亜紀後期（約7200万〜6990万年前）',
        description: '「肉食の雄牛」を意味し、目の上の角が特徴。足が非常に速かったと言われています。',
        type: 'carnivore',
        unlockCondition: 70,
        colors: { primary: '#b22222', secondary: '#8b0000', accent: '#ffdead' },
        cssPrefix: 'character-famicom-carnotaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/trex_egg.png' },
            { name: '赤ちゃんカルノ', minDays: 1, image: 'assets/characters/trex_egg.png' },
            { name: '子供カルノ', minDays: 8, image: 'assets/characters/trex_egg.png' },
            { name: '大人カルノ', minDays: 22, image: 'assets/characters/trex_egg.png' }
        ]
    },

    diplodocus: {
        id: 'diplodocus',
        isAvailable: false,
        name: 'ディプロドクス',
        scientificName: 'Diplodocus',
        nickname: 'ディプロ',
        era: 'ジュラ紀後期（約1億5400万〜1億5200万年前）',
        description: '非常に長い首と、鞭のようにしなる長い尻尾が特徴の巨大草食恐竜です。',
        type: 'herbivore',
        unlockCondition: 75,
        colors: { primary: '#778899', secondary: '#2f4f4f', accent: '#d3d3d3' },
        cssPrefix: 'character-famicom-diplodocus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/brachiosaurus_egg.png' },
            { name: '赤ちゃんディプロ', minDays: 1, image: 'assets/characters/brachiosaurus_egg.png' },
            { name: '子供ディプロ', minDays: 8, image: 'assets/characters/brachiosaurus_egg.png' },
            { name: '大人ディプロ', minDays: 22, image: 'assets/characters/brachiosaurus_egg.png' }
        ]
    },

    pachycephalosaurus: {
        id: 'pachycephalosaurus',
        isAvailable: false,
        name: 'パキケファロサウルス',
        scientificName: 'Pachycephalosaurus',
        nickname: 'パキケファロ',
        era: '白亜紀後期（約7000万〜6600万年前）',
        description: '頭頂部がドーム状に盛り上がった「厚い頭のトカゲ」。頭突きで戦っていた説が有名です。',
        type: 'herbivore',
        unlockCondition: 80,
        colors: { primary: '#deb887', secondary: '#8b4513', accent: '#fff8dc' },
        cssPrefix: 'character-famicom-pachycephalosaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/triceratops_egg.png' },
            { name: '赤ちゃんパキケ', minDays: 1, image: 'assets/characters/triceratops_egg.png' },
            { name: '子供パキケ', minDays: 8, image: 'assets/characters/triceratops_egg.png' },
            { name: '大人パキケ', minDays: 22, image: 'assets/characters/triceratops_egg.png' }
        ]
    },

    deinonychus: {
        id: 'deinonychus',
        isAvailable: false,
        name: 'デイノニクス',
        scientificName: 'Deinonychus',
        nickname: 'デイノ',
        era: '白亜紀前期（約1億1500万〜1億800万年前）',
        description: '「恐ろしい爪」を意味し、足の第二指の大きな鉤爪が特徴。ヴェロキラプトルより大型です。',
        type: 'carnivore',
        unlockCondition: 85,
        colors: { primary: '#708090', secondary: '#2f4f4f', accent: '#ff6347' },
        cssPrefix: 'character-famicom-deinonychus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/velociraptor_egg.png' },
            { name: '赤ちゃんデイノ', minDays: 1, image: 'assets/characters/velociraptor_egg.png' },
            { name: '子供デイノ', minDays: 8, image: 'assets/characters/velociraptor_egg.png' },
            { name: '大人デイノ', minDays: 22, image: 'assets/characters/velociraptor_egg.png' }
        ]
    },

    iguanodon: {
        id: 'iguanodon',
        isAvailable: false,
        name: 'イグアノドン',
        scientificName: 'Iguanodon',
        nickname: 'イグアノ',
        era: '白亜紀前期（約1億2600万〜1億1300万年前）',
        description: '親指が鋭いスパイクになっているのが特徴。初期に発見された恐竜の一つです。',
        type: 'herbivore',
        unlockCondition: 90,
        colors: { primary: '#9acd32', secondary: '#6b8e23', accent: '#f5deb3' },
        cssPrefix: 'character-famicom-iguanodon',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/triceratops_egg.png' },
            { name: '赤ちゃんイグアノ', minDays: 1, image: 'assets/characters/triceratops_egg.png' },
            { name: '子供イグアノ', minDays: 8, image: 'assets/characters/triceratops_egg.png' },
            { name: '大人イグアノ', minDays: 22, image: 'assets/characters/triceratops_egg.png' }
        ]
    },

    archaeopteryx: {
        id: 'archaeopteryx',
        isAvailable: false,
        name: '始祖鳥',
        scientificName: 'Archaeopteryx',
        nickname: 'アーケオ',
        era: 'ジュラ紀後期（約1億5000万〜1億4500万年前）',
        description: '恐竜と鳥類の特徴を併せ持つ、最も古い鳥類の一つ。美しい羽毛を持っていました。',
        type: 'flying',
        unlockCondition: 95,
        colors: { primary: '#fffaf0', secondary: '#ffd700', accent: '#000000' },
        cssPrefix: 'character-famicom-archaeopteryx',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/pteranodon_egg.png' },
            { name: '赤ちゃんアーケオ', minDays: 1, image: 'assets/characters/pteranodon_egg.png' },
            { name: '子供アーケオ', minDays: 8, image: 'assets/characters/pteranodon_egg.png' },
            { name: '大人アーケオ', minDays: 22, image: 'assets/characters/pteranodon_egg.png' }
        ]
    },

    dilophosaurus: {
        id: 'dilophosaurus',
        isAvailable: false,
        name: 'ディロフォサウルス',
        scientificName: 'Dilophosaurus',
        nickname: 'ディロフォ',
        era: 'ジュラ紀前期（約1億9300万年前）',
        description: '頭の上に2つのトサカを持つ肉食恐竜。「2つの隆起を持つトカゲ」という意味です。',
        type: 'carnivore',
        unlockCondition: 100,
        colors: { primary: '#32cd32', secondary: '#006400', accent: '#ff0000' },
        cssPrefix: 'character-famicom-dilophosaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/trex_egg.png' },
            { name: '赤ちゃんディロフォ', minDays: 1, image: 'assets/characters/trex_egg.png' },
            { name: '子供ディロフォ', minDays: 8, image: 'assets/characters/trex_egg.png' },
            { name: '大人ディロフォ', minDays: 22, image: 'assets/characters/trex_egg.png' }
        ]
    },

    therizinosaurus: {
        id: 'therizinosaurus',
        isAvailable: false,
        name: 'テリジノサウルス',
        scientificName: 'Therizinosaurus',
        nickname: 'テリジノ',
        era: '白亜紀後期（約7000万年前）',
        description: '巨大な鎌のような爪を持つ、「刈り取りトカゲ」。実は植物食だったと考えられています。',
        type: 'herbivore',
        unlockCondition: 110,
        colors: { primary: '#808000', secondary: '#556b2f', accent: '#ffc0cb' },
        cssPrefix: 'character-famicom-therizinosaurus',
        stages: [
            { name: 'タマゴ', minDays: 0, image: 'assets/characters/trex_egg.png' },
            { name: '赤ちゃんテリジノ', minDays: 1, image: 'assets/characters/trex_egg.png' },
            { name: '子供テリジノ', minDays: 8, image: 'assets/characters/trex_egg.png' },
            { name: '大人テリジノ', minDays: 22, image: 'assets/characters/trex_egg.png' }
        ]
    }
};

// ヘルパー関数
/**
 * 初期解放されている恐竜種を取得
 * @returns {Array} 初期解放恐竜のIDリスト
 */
function getInitialSpecies() {
    return Object.values(DINOSAUR_SPECIES)
        .filter(species => species.unlockCondition === null && species.isAvailable)
        .map(species => species.id);
}

/**
 * アンロック可能な恐竜をチェック
 * @param {number} maxConsecutiveDays - 最高連続日数
 * @param {Array} currentUnlocked - 現在アンロック済みの恐竜ID
 * @returns {Array} 新たにアンロックされた恐竜のIDリスト
 */
function checkUnlockableSpecies(maxConsecutiveDays, currentUnlocked = []) {
    return Object.values(DINOSAUR_SPECIES)
        .filter(species =>
            species.isAvailable && // 公開中のものだけ
            species.unlockCondition !== null &&
            maxConsecutiveDays >= species.unlockCondition &&
            !currentUnlocked.includes(species.id)
        )
        .map(species => species.id);
}

/**
 * 恐竜種の情報を取得
 * @param {string} speciesId - 恐竜種ID
 * @returns {object|null} 恐竜種の情報
 */
function getSpeciesInfo(speciesId) {
    return DINOSAUR_SPECIES[speciesId] || null;
}

/**
 * すべての恐竜種のリストを取得
 * @returns {Array} 恐竜種の配列
 */
function getAllSpecies() {
    return Object.values(DINOSAUR_SPECIES).filter(s => s.isAvailable);
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DINOSAUR_SPECIES,
        getInitialSpecies,
        checkUnlockableSpecies,
        getSpeciesInfo,
        getAllSpecies
    };
}
