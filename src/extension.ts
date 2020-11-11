import * as vscode from "vscode";

const targetLineIsEmptyOrWhitespace = (
  line: number,
  document: vscode.TextDocument
) => !document.lineAt(line).isEmptyOrWhitespace;

enum LineOperation {
  Up = 1,
  Down = 2,
}

function getNextLine(editor: vscode.TextEditor, op: LineOperation) {
  let document = editor.document;
  let line = editor.selection.active.line;

  switch (op) {
    case LineOperation.Up:
      {
        while (line > 0 && targetLineIsEmptyOrWhitespace(--line, document)) {}
      }
      break;

    case LineOperation.Down:
      {
        while (
          line < document.lineCount - 1 &&
          targetLineIsEmptyOrWhitespace(++line, document)
        ) {}
      }
      break;
  }

  return document.lineAt(line);
}

function moveCursor(editor: vscode.TextEditor, newPosition: vscode.Position) {
  let newCursorPosition = new vscode.Selection(newPosition, newPosition);
  editor.selection = newCursorPosition;
  editor.revealRange(new vscode.Range(newPosition, newPosition));
}

export function activate(context: vscode.ExtensionContext) {
  let paragraphJumpUp = vscode.commands.registerTextEditorCommand(
    "paragraphjump.up",
    (editor: vscode.TextEditor) => {
      let targetLine: vscode.TextLine = getNextLine(editor, LineOperation.Up);
      const newPosition = new vscode.Position(targetLine.lineNumber, 0);
      moveCursor(editor, newPosition);
    }
  );

  let paragraphJumpDown = vscode.commands.registerTextEditorCommand(
    "paragraphjump.down",
    (editor: vscode.TextEditor) => {
      let targetLine: vscode.TextLine = getNextLine(editor, LineOperation.Down);
      const newPosition = new vscode.Position(targetLine.lineNumber, 0);
      moveCursor(editor, newPosition);
    }
  );

  context.subscriptions.push(paragraphJumpUp, paragraphJumpDown);
}

export function deactivate() {}
