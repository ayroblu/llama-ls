import {
  Connection,
  DidChangeConfigurationParams,
  TextDocumentChangeEvent,
} from "vscode-languageserver";
import { config } from "./config.js";
import { TextDocument } from "vscode-languageserver-textdocument";

type Settings = {
  maxNumberOfProblems: number;
};

const defaultSettings: Settings = { maxNumberOfProblems: 100 };
let globalSettings: Settings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<Settings>> = new Map();

export function handleDocumentSettingsChange(
  change: DidChangeConfigurationParams,
) {
  if (config.hasConfigurationCapability) {
    // Reset all cached document settings
    documentSettings.clear();
  } else {
    globalSettings = <Settings>(change.settings.llamals || defaultSettings);
  }
}

export const getDocumentSettingsFn =
  (connection: Connection) =>
  (resource: string): Thenable<Settings> => {
    if (!config.hasConfigurationCapability) {
      return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
      result = connection.workspace.getConfiguration({
        scopeUri: resource,
        section: "llamals",
      });
      documentSettings.set(resource, result);
    }
    return result;
  };

export function handleCloseDocument(e: TextDocumentChangeEvent<TextDocument>) {
  documentSettings.delete(e.document.uri);
}
