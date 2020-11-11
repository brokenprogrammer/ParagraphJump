import * as vscode from "vscode";

const targetLineIsEmptyOrWhitespace = (
  line: number,
  document: vscode.TextDocument
) => !document.lineAt(line).isEmptyOrWhitespace;

enum LineOperation {
  up = 0,
  down = 1,
}

function getNextLine(editor: vscode.TextEditor, op: LineOperation) {
  let document = editor.document;
  let line = editor.selection.active.line;

  switch (op) {
    case LineOperation.up:
      {
        while (line > 0 && targetLineIsEmptyOrWhitespace(--line, document)) {}
      }
      break;

    case LineOperation.down:
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

enum MoveOperation {
  move = 0,
  select = 1,
}

function moveCursor(
  editor: vscode.TextEditor,
  newPosition: vscode.Position,
  op: MoveOperation
) {
  let newCursorPosition: vscode.Selection;
  switch (op) {
    case MoveOperation.move:
      {
        newCursorPosition = new vscode.Selection(newPosition, newPosition);
      }
      break;
    case MoveOperation.select:
      {
        let anchor = editor.selection.anchor;
        newCursorPosition = new vscode.Selection(anchor, newPosition);
      }
      break;
  }
  editor.selection = newCursorPosition;
  editor.revealRange(new vscode.Range(newPosition, newPosition));
}

export function activate(context: vscode.ExtensionContext) {
  let paragraphJumpUp = vscode.commands.registerTextEditorCommand(
    "paragraphjump.up",
    (editor: vscode.TextEditor) => {
      const targetLine: vscode.TextLine = getNextLine(editor, LineOperation.up);
      const newPosition = new vscode.Position(targetLine.lineNumber, 0);
      moveCursor(editor, newPosition, MoveOperation.move);
    }
  );

  let paragraphJumpDown = vscode.commands.registerTextEditorCommand(
    "paragraphjump.down",
    (editor: vscode.TextEditor) => {
      const targetLine: vscode.TextLine = getNextLine(
        editor,
        LineOperation.down
      );
      const newPosition = new vscode.Position(
        targetLine.lineNumber,
        targetLine.text.length
      );
      moveCursor(editor, newPosition, MoveOperation.move);
    }
  );

  let paragraphSelectUp = vscode.commands.registerTextEditorCommand(
    "paragraphjump.selectup",
    (editor: vscode.TextEditor) => {
      const targetLine: vscode.TextLine = getNextLine(editor, LineOperation.up);
      const newPosition = new vscode.Position(targetLine.lineNumber, 0);
      moveCursor(editor, newPosition, MoveOperation.select);
    }
  );

  let paragraphSelectDown = vscode.commands.registerTextEditorCommand(
    "paragraphjump.selectdown",
    (editor: vscode.TextEditor) => {
      const targetLine: vscode.TextLine = getNextLine(
        editor,
        LineOperation.down
      );
      const newPosition = new vscode.Position(
        targetLine.lineNumber,
        targetLine.text.length
      );
      moveCursor(editor, newPosition, MoveOperation.select);
    }
  );

  context.subscriptions.push(
    paragraphJumpUp,
    paragraphJumpDown,
    paragraphSelectUp,
    paragraphSelectDown
  );
}

export function deactivate() {}
