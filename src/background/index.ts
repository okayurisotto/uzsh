import "reflect-metadata";
import { container } from "tsyringe";
import { ExtensionActivator } from "./ExtensionActivator";

const extensionActivator = container.resolve(ExtensionActivator);
extensionActivator.activate();
