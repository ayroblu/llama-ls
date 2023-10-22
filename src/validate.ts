import { TextDocument } from "vscode-languageserver-textdocument";
import { getDocumentSettingsFn } from "./document-settings.js";
import {
  Connection,
  Diagnostic,
  DiagnosticSeverity,
} from "vscode-languageserver/node.js";
import { config } from "./config.js";

export function validateTextDocumentFn(connection: Connection) {
  const getDocumentSettings = getDocumentSettingsFn(connection);
  return async (textDocument: TextDocument): Promise<void> => {
    // In this simple example we get the settings for every validate run.
    const settings = await getDocumentSettings(textDocument.uri);

    // // The validator creates diagnostics for all uppercase words length 2 and more
    // const text = textDocument.getText();
    // const pattern = /\b[A-Z]{2,}\b/g;
    // let m: RegExpExecArray | null;

    // let problems = 0;
    // const diagnostics: Diagnostic[] = [];
    // while (
    //   (m = pattern.exec(text)) &&
    //   problems < settings.maxNumberOfProblems
    // ) {
    //   problems++;
    //   const diagnostic: Diagnostic = {
    //     severity: DiagnosticSeverity.Warning,
    //     range: {
    //       start: textDocument.positionAt(m.index),
    //       end: textDocument.positionAt(m.index + m[0].length),
    //     },
    //     message: `${m[0]} is all uppercase.`,
    //     source: "llama-ls",
    //   };
    //   if (config.hasDiagnosticRelatedInformationCapability) {
    //     diagnostic.relatedInformation = [
    //       {
    //         location: {
    //           uri: textDocument.uri,
    //           range: Object.assign({}, diagnostic.range),
    //         },
    //         message: "Spelling matters",
    //       },
    //       {
    //         location: {
    //           uri: textDocument.uri,
    //           range: Object.assign({}, diagnostic.range),
    //         },
    //         message: "Particularly for names",
    //       },
    //     ];
    //   }
    //   diagnostics.push(diagnostic);
    // }

    // // Send the computed diagnostics to VSCode.
    // connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  };
}
