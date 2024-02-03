# [uzsh](https://github.com/okayurisotto/uzsh)

A minimal userscript & userstyle manager for **Firefox**.

## ビルド方法 - Build

This project requires [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) to build.

My build environment is:

```
$ node -v
v20.11.0
# See also `engines.node` in `package.json`.

$ pnpm -v
8.14.3
# See also `packageManager` in `package.json`.
```

- Apple MacBook Air (2020)
- macOS Sonoma 14.3

---

The build steps are:

```
$ pnpm install --frozen-lockfile

$ pnpm run build
```

Then, `dist-tsup` and `dist-vite` directories will be created under the project root directory.

(If you want to create a ZIP file, run the command below.)

```
$ zip -r uzsh.zip dist-tsup dist-vite manifest.json README.md
```

## 内部データ構造 - Internal Data Structures

```ts
type UserEntry = {
  type: UserEntryType;
  url: RegExp;
  when: UserEntryWhen[];
  source: string;
};

/**
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/insertCSS
 */
type UserEntryType = "executeScript" | "insertCSS";

/**
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation
 */
type UserEntryWhen = "onDOMContentLoaded" | "onCompleted" | "onHistoryStateUpdated";
```

## 権限 - Permissions

```jsonc
[
  // `UserEntry[]`を保存するために
  "storage",
  // `.executeScript()`や`.insertCSS()`を実行するために
  "tabs",
  // `.addListener()`するために
  "webNavigation",

  // host_permissions
  "http://*/*", "https://*/*"
]
```

## ライセンス - License

CC0-1.0
