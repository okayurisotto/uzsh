import { injectable } from "tsyringe";
import { UserEntriesInjector } from "./UserEntriesInjector";

@injectable()
export class ExtensionActivator {
  constructor(private readonly userEntriesInjector: UserEntriesInjector) {}

  public activate(): void {
    this.userEntriesInjector.activate();
  }
}
