# アプリのWeb公開手順 (GitHub Pages)

このアプリをスマホで安定して動作させるため、無料の「GitHub Pages」を使って公開する手順です。

## ステップ1: GitHubアカウントの準備
1. [GitHub.com](https://github.co.jp/) にアクセスします。
2. アカウントをお持ちでない場合は「登録」から無料アカウントを作成してください。

## ステップ2: リポジトリの作成
1. GitHubにログインし、右上の「+」アイコンから **「New repository」** を選択します。
2. **Repository name** に好きな名前を入力します（例: `dino-health-app`）。
3. **Public** (公開) を選択します。
4. **「Create repository」** をクリックします。

## ステップ3: ファイルのアップロード
1. 作成されたリポジトリの画面で、**「uploading an existing file」** というリンクをクリックします。
2. あなたのPCの `Documents/helth/for_mobile` フォルダの中身を**すべて選択し、ブラウザ画面にドラッグ＆ドロップ**します。
   - `index.html` (元 app-working.html)
   - `manifest.json`, `sw.js`
   - `assets` フォルダなど全て
3. アップロードが終わったら、下部の「Commit changes」ボタンをクリックします。

## ステップ4: 公開設定 (Pages)
1. リポジトリの上部メニューから **「Settings」** をクリックします。
2. 左サイドバーの **「Pages」** をクリックします。
3. **Branch** の設定で `None` を `main` (または `master`) に変更し、横のフォルダは `/(root)` のまま **「Save」** をクリックします。
4. 数分待つと、画面上部に「Your site is live at...」とURLが表示されます。これがあなたのアプリのURLです！

## ステップ5: スマホへのインストール
1. スマホのChromeで、発行されたURLにアクセスします。
2. 画面下部やメニューに表示される **「ホーム画面に追加」** (またはインストール) をタップします。
3. これで、タスクキルしても消えない、完全なアプリとして動作します！
