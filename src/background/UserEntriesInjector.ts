import { singleton } from "tsyringe";
import { UserScriptsInjector } from "./UserScriptsInjector";
import { UserStylesInjector } from "./UserStylesInjector";

@singleton()
export class UserEntriesInjector {
  constructor(
    private readonly userStylesInjector: UserStylesInjector,
    private readonly userScriptsInjector: UserScriptsInjector,
  ) {}

  public activate(): void {
    this.userScriptsInjector.activate();
    this.userStylesInjector.activate();
  }
}
