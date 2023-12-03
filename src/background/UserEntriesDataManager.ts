import { type Disposable, singleton } from "tsyringe";
import { storage } from "webextension-polyfill";
import { z } from "zod";
import { UserEntrySchema, StorageKey, StorageSchema } from "../const";

@singleton()
export class UserEntriesDataManager implements Disposable {
  public entries: z.infer<typeof UserEntrySchema>[] = [];

  private readonly handleChanged = () => void this.load.bind(this)();

  constructor() {
    void this.load();
    storage.local.onChanged.addListener(this.handleChanged);
  }

  private async load(): Promise<void> {
    const result = await storage.local.get(StorageKey.UserEntries);
    this.entries = StorageSchema.parse(result)[StorageKey.UserEntries];
    console.log("UserEntriesDataManager.load()", this.entries);
  }

  public dispose(): void {
    storage.local.onChanged.removeListener(this.handleChanged);
  }
}
