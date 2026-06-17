# ほやほやほんやく (hoyaTranslate)

ブラウザ上の日本語テキストを「ほや語」に変換する Chrome 拡張機能。

- ランディング: https://wassyoi-fes.github.io/hoyaTranslate/
- プライバシーポリシー: https://wassyoi-fes.github.io/hoyaTranslate/privacy.html

## モード

| モード | 内容 |
|---|---|
| ほや | 挨拶・定型表現を中心にほや化 |
| スーパーほや | 関連する漢字熟語も追加でほや化 |
| ウルトラほや | 対応する全表現をほや化 |
| ウルトラほや 逆ほんやく | ほや化された文章を元に戻す |

## 開発

ローカルで動かす場合は `chrome://extensions` の「パッケージ化されていない拡張機能を読み込む」でこのフォルダを選択。

```
hoyahoya-extension/
├── manifest.json
├── popup.html / popup.js / popup.css
├── content.js
├── icons/
└── docs/         # GitHub Pages
    ├── index.html
    ├── privacy.html
    └── style.css
```
