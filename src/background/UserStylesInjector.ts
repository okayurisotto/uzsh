import { singleton, type Disposable } from "tsyringe";
import { tabs, webNavigation, type WebNavigation } from "webextension-polyfill";
import { webNavigationEventUrlFilter } from "./const";
import { UserEntriesDataManager } from "./UserEntriesDataManager";

@singleton()
export class UserStylesInjector implements Disposable {
  private readonly handleDOMContentLoaded = (
    args: WebNavigation.OnDOMContentLoadedDetailsType,
  ) => {
    if (args.frameId !== 0) return;

    void Promise.all(
      this.userEntriesStorageManager.entries
        .filter((script) => {
          if (script.type !== "insertCSS") return false;
          if (!script.when.includes("onDOMContentLoaded")) return false;
          if (!script.url.test(args.url)) return false;
          return true;
        })
        .map(async (target) => {
          await tabs.insertCSS(args.tabId, {
            code: target.source,
          });
        }),
    );
  };

  private readonly handleCompleted = (
    args: WebNavigation.OnCompletedDetailsType,
  ) => {
    if (args.frameId !== 0) return;

    void Promise.all(
      this.userEntriesStorageManager.entries
        .filter((script) => {
          if (script.type !== "insertCSS") return false;
          if (!script.when.includes("onCompleted")) return false;
          if (!script.url.test(args.url)) return false;
          return true;
        })
        .map(async (target) => {
          await tabs.insertCSS(args.tabId, {
            code: target.source,
          });
        }),
    );
  };

  private readonly handleHistoryStateUpdated = (
    args: WebNavigation.OnHistoryStateUpdatedDetailsType,
  ) => {
    if (args.frameId !== 0) return;

    void Promise.all(
      this.userEntriesStorageManager.entries
        .filter((script) => {
          if (script.type !== "insertCSS") return false;
          if (!script.when.includes("onHistoryStateUpdated")) return false;
          if (!script.url.test(args.url)) return false;
          return true;
        })
        .map(async (target) => {
          await tabs.executeScript(args.tabId, {
            code: target.source,
          });
        }),
    );
  };

  constructor(
    private readonly userEntriesStorageManager: UserEntriesDataManager,
  ) {}

  public activate(): void {
    webNavigation.onDOMContentLoaded.addListener(
      this.handleDOMContentLoaded,
      webNavigationEventUrlFilter,
    );
    webNavigation.onCompleted.addListener(
      this.handleCompleted,
      webNavigationEventUrlFilter,
    );
    webNavigation.onHistoryStateUpdated.addListener(
      this.handleHistoryStateUpdated,
      webNavigationEventUrlFilter,
    );
  }

  public dispose(): void {
    webNavigation.onDOMContentLoaded.removeListener(
      this.handleDOMContentLoaded,
    );
    webNavigation.onCompleted.removeListener(this.handleCompleted);
    webNavigation.onHistoryStateUpdated.removeListener(
      this.handleHistoryStateUpdated,
    );
  }
}
