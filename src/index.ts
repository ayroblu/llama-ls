import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
} from "vscode-languageserver/node";

import { TextDocument } from "vscode-languageserver-textdocument";
import { onInitialize, onInitializedFn } from "./config";
import {
  handleCloseDocument,
  handleDocumentSettingsChange,
} from "./document-settings";
import { validateTextDocumentFn } from "./validate";
import { handleCompletionFn, handleCompletionResolve } from "./completion";

const connection = createConnection(ProposedFeatures.all);

const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize(onInitialize);

connection.onInitialized(onInitializedFn(connection));

const validateTextDocument = validateTextDocumentFn(connection);
connection.onDidChangeConfiguration((change) => {
  handleDocumentSettingsChange(change);

  documents.all().forEach(validateTextDocument);
});

documents.onDidClose(handleCloseDocument);

documents.onDidChangeContent((change) => {
  validateTextDocument(change.document);
});

connection.onDidChangeWatchedFiles((_change) => {
  connection.console.log("We received an file change event");
});

connection.onCompletion(handleCompletionFn(documents));

connection.onCompletionResolve(handleCompletionResolve);

documents.listen(connection);

connection.listen();