import { TextDocument } from "vscode-languageserver-textdocument";
import {
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocuments,
} from "vscode-languageserver/node";

export const handleCompletionFn =
  (documents: TextDocuments<TextDocument>) =>
  async (
    textDocumentPosition: TextDocumentPositionParams,
  ): Promise<CompletionItem[]> => {
    const text = documents
      .get(textDocumentPosition.textDocument.uri)
      ?.getText();
    // The pass parameter contains the position of the text document in
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    return [
      {
        label: "TypeScript",
        kind: CompletionItemKind.Text,
        data: 1,
      },
      {
        label: "JavaScript",
        kind: CompletionItemKind.Text,
        data: 2,
      },
    ];
  };

export async function handleCompletionResolve(
  item: CompletionItem,
): Promise<CompletionItem> {
  if (item.data === 1) {
    item.detail = "TypeScript details";
    item.documentation = "TypeScript documentation";
  } else if (item.data === 2) {
    item.detail = "JavaScript details";
    item.documentation = "JavaScript documentation";
  }
  return item;
}
