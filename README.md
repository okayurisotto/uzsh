# uzsh - A minimal userscript & userstyle manager for **Firefox**.

https://github.com/okayurisotto/uzsh

## 概要

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

## 権限

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

## ライセンス

CC0-1.0

## Manifest V3? Chrome?

いいえ。

###  [scripting API](https://developer.chrome.com/docs/extensions/reference/scripting/)

> If injecting CSS within a page, you can also specify a string to be used in the `css` property. This option is only available for `scripting.insertCSS()`; you can't execute a string using `scripting.executeScript()`.

🤔

### [userScripts API](https://developer.chrome.com/docs/extensions/reference/userScripts/)

> This is coming soon and not yet in a stable release of Chrome

😇
