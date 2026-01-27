# 🔄 Android版とPC版の同期ポリシー

## 概要

このドキュメントは、PC版（`/health/index.html`）とAndroid版（`/health/for_mobile/index.html`）の機能を常に同期させるためのガイドラインです。

---

## 📂 ディレクトリ構成

### PC版（開発環境）
```
health/
├── index.html              ← メインアプリ
├── encyclopedia.html       ← 図鑑
├── history-calendar.html   ← カレンダー
├── graph.html              ← グラフ表示
├── dinosaur-selection.html ← 恐竜選択（独立ページ版）
├── dinosaur-species.js     ← 恐竜データ
├── manifest.json           ← PWA設定
├── sw.js                   ← Service Worker
├── js/                     ← 共通モジュール
│   ├── date-utils.js
│   ├── storage-utils.js
│   ├── data-manager.js
│   └── unlock-system.js
└── assets/                 ← 画像とアイコン
    ├── characters/
    └── icons/
```

### Android版（公開環境）
```
for_mobile/
├── index.html              ← メインアプリ（PC版と同等）
├── encyclopedia.html       ← 図鑑（PC版と同一）
├── history-calendar.html   ← カレンダー（PC版と同一）
├── graph.html              ← グラフ表示（PC版と同一）
├── dinosaur-selection.html ← 恐竜選択（PC版と同一）
├── dinosaur-species.js     ← 恐竜データ（PC版と同一）
├── manifest.json           ← PWA設定（PC版と同一）
├── sw.js                   ← Service Worker（PC版と同一）
├── js/                     ← 共通モジュール（PC版と同一）
├── assets/                 ← 画像（PC版と同一）
├── README.md               ← Android版専用
├── DATA_MIGRATION_GUIDE.md ← データ引き継ぎガイド
├── MOBILE_TEST_REPORT.md   ← モバイルテストレポート
└── .gitignore              ← Git設定
```

---

## ⚙️ 同期ルール

### 🔄 完全同期対象

以下のファイルは、PC版とAndroid版で**完全に同一**である必要があります：

| ファイル | 同期方法 | 理由 |
|---------|---------|------|
| `index.html` | コピー | メインアプリケーション |
| `encyclopedia.html` | コピー | 図鑑機能 |
| `history-calendar.html` | コピー | カレンダー表示 |
| `graph.html` | コピー | グラフ表示 |
| `dinosaur-selection.html` | コピー | 恐竜選択画面 |
| `dinosaur-species.js` | コピー | 恐竜マスターデータ |
| `manifest.json` | コピー | PWA設定 |
| `sw.js` | コピー | Service Worker |
| `js/` | コピー（全ファイル） | 共通モジュール |
| `assets/` | コピー（全ファイル） | 画像アセット |

### 📝 Android版専用ファイル

以下のファイルはAndroid版にのみ存在し、同期不要：

- `README.md` - GitHub公開用の説明
- `DATA_MIGRATION_GUIDE.md` - データ引き継ぎ手順
- `MOBILE_TEST_REPORT.md` - モバイルテストレポート
- `.gitignore` - Git設定

---

## 🔧 変更時の同期手順

### PowerShellスクリプト（推奨）

PC版からAndroid版への一括同期：

```powershell
# health ディレクトリで実行

# メインファイル
Copy-Item "index.html" "for_mobile\index.html" -Force
Copy-Item "encyclopedia.html" "for_mobile\encyclopedia.html" -Force
Copy-Item "history-calendar.html" "for_mobile\history-calendar.html" -Force
Copy-Item "graph.html" "for_mobile\graph.html" -Force
Copy-Item "dinosaur-selection.html" "for_mobile\dinosaur-selection.html" -Force
Copy-Item "dinosaur-species.js" "for_mobile\dinosaur-species.js" -Force
Copy-Item "manifest.json" "for_mobile\manifest.json" -Force
Copy-Item "sw.js" "for_mobile\sw.js" -Force

# ディレクトリ（既存を削除して完全コピー）
if (Test-Path "for_mobile\js") { Remove-Item "for_mobile\js" -Recurse -Force }
Copy-Item "js" "for_mobile\js" -Recurse -Force

if (Test-Path "for_mobile\assets") { Remove-Item "for_mobile\assets" -Recurse -Force }
Copy-Item "assets" "for_mobile\assets" -Recurse -Force

Write-Host "同期完了！" -ForegroundColor Green
```

### 手動同期（個別ファイル）

特定のファイルのみ変更した場合：

```powershell
# 例: index.htmlのみ変更した場合
Copy-Item "index.html" "for_mobile\index.html" -Force

# 例: 恐竜データのみ変更した場合
Copy-Item "dinosaur-species.js" "for_mobile\dinosaur-species.js" -Force

# 例: 共通モジュールのみ変更した場合
Copy-Item "js\data-manager.js" "for_mobile\js\data-manager.js" -Force
```

---

## ✅ 変更チェックリスト

変更を加えた場合、以下をチェック：

### コード変更時

- [ ] PC版で動作確認
- [ ] Android版にファイルをコピー
- [ ] 両版で動作確認
- [ ] コミット前に差分確認

### 新機能追加時

- [ ] PC版で実装・テスト
- [ ] 全ての関連ファイルをAndroid版にコピー
- [ ] モバイル表示の確認
- [ ] PWA機能の確認

### バグ修正時

- [ ] PC版で修正
- [ ] 修正したファイルをAndroid版にコピー
- [ ] 両版で修正を確認

### デザイン変更時

- [ ] PC版で調整
- [ ] CSSを含む全ファイルをコピー
- [ ] デスクトップとモバイル両方で表示確認

---

## 🚨 注意事項

### 絶対に守ること

1. **index.htmlは常に同一**
   - メインアプリの機能は完全同等である必要があります
   - モバイル最適化はCSSのメディアクエリで対応

2. **共通モジュール（js/）は完全同期**
   - データ管理ロジックは両版で同一である必要があります
   - バージョン不一致はデータ破損の原因になります

3. **恐竜データ（dinosaur-species.js）は完全同期**
   - マスターデータの不一致は重大なバグを引き起こします

4. **画像アセットは完全同期**
   - 画像ファイル名の不一致は表示エラーになります

### やってはいけないこと

❌ Android版のみに機能を追加
❌ PC版とAndroid版で異なるバージョンのコードを維持
❌ 手動で一部のコードのみをコピー（全体の整合性が崩れる）

---

## 🔍 同期確認方法

### ファイルサイズで確認

```powershell
# 主要ファイルのサイズ比較
Compare-Object `
    (Get-ChildItem "index.html" | Select-Object Name, Length) `
    (Get-ChildItem "for_mobile\index.html" | Select-Object Name, Length)

# 出力なし = 同一サイズ
```

### ハッシュ値で確認（完全一致）

```powershell
# ファイルの完全一致確認
$pc = Get-FileHash "index.html"
$mobile = Get-FileHash "for_mobile\index.html"

if ($pc.Hash -eq $mobile.Hash) {
    Write-Host "✅ 同一" -ForegroundColor Green
} else {
    Write-Host "⚠️ 差分あり" -ForegroundColor Yellow
}
```

---

## 📋 今後の運用

### 開発フロー

1. **PC版で開発**
   ```
   health/index.html で機能追加・修正
   ```

2. **ローカルテスト**
   ```
   ブラウザで動作確認
   ```

3. **Android版に同期**
   ```powershell
   Copy-Item ... -Force
   ```

4. **モバイルテスト**
   ```
   モバイルビューで確認
   ```

5. **コミット**
   ```bash
   git add .
   git commit -m "機能追加: XXX（両版同期済み）"
   ```

---

## 🎯 まとめ

- **PC版 = 開発環境**、**Android版 = 公開環境**
- 全ての変更はPC版で行い、Android版にコピー
- 両版は完全に同等の機能を持つ
- ユーザーはどちらでも同じ体験ができる

**常に両版を同期させることで、一貫したユーザー体験を提供します** ✨
