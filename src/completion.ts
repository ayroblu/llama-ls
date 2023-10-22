import { TextDocument } from "vscode-languageserver-textdocument";
import {
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocuments,
} from "vscode-languageserver/node.js";
import { log } from "./logger.js";

export const handleCompletionFn =
  (documents: TextDocuments<TextDocument>) =>
  async (
    textDocumentPosition: TextDocumentPositionParams,
  ): Promise<CompletionItem[]> => {
    const text = documents
      .get(textDocumentPosition.textDocument.uri)
      ?.getText();
    if (!text) {
      log("no text found?");
      return [];
    }
    const label = await timeFn(() => getText(text));
    if (!label.trim()) {
      log("no label found?");
      return [];
    }
    return [
      {
        label,
        kind: CompletionItemKind.Text,
        preselect: true,
      },
    ];
  };

async function timeFn<T>(fn: () => Promise<T>): Promise<T> {
  const beforeMs = performance.now();
  const timeoutId = setTimeout(() => log("calculating value slow..."), 3000);
  const value = await fn();
  clearTimeout(timeoutId);
  const durationMs = performance.now() - beforeMs;
  log("value calculated in", durationMs.toFixed(1), "ms");
  return value;
}

async function getText(prompt: string) {
  const response = await fetch("http://127.0.0.1:8080/completion", {
    method: "POST",
    body: JSON.stringify({
      prompt,
      n_predict: 512,
      temperature: 0.5,
    }),
  });
  const responseJson = await response.json();
  return responseJson.content.replace("<EOT>", "");
}

export async function handleCompletionResolve(
  item: CompletionItem,
): Promise<CompletionItem> {
  item.detail = "From llama.cpp";
  // item.documentation = "TypeScript documentation";
  // if (item.data === 1) {
  //   item.detail = "TypeScript details";
  //   item.documentation = "TypeScript documentation";
  // } else if (item.data === 2) {
  //   item.detail = "JavaScript details";
  //   item.documentation = "JavaScript documentation";
  // }
  return item;
}
