import { singleton } from "tsyringe";
import { UserEntriesInjector } from "./UserEntriesInjector";

@singleton()
export class ExtensionActivator {
  constructor(private readonly userEntriesInjector: UserEntriesInjector) {}

  public activate(): void {
    this.userEntriesInjector.activate();
  }
}
