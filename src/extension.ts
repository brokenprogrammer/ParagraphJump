import * as vscode from "vscode";

enum LineOperation {
  up = 0,
  down = 1,
}

enum MoveOperation {
  move = 0,
  select = 1,
}

enum ParagraphJumpOperation {
  moveUp = 0,
  moveDown = 1,
  selectUp = 2,
  selectDown = 3,
}

const targetLineIsEmptyOrWhitespace = (
  line: number,
  document: vscode.TextDocument
) => !document.lineAt(line).isEmptyOrWhitespace;

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
        const anchor = editor.selection.anchor;
        newCursorPosition = new vscode.Selection(anchor, newPosition);
      }
      break;
  }
  editor.selection = newCursorPosition;
  editor.revealRange(new vscode.Range(newPosition, newPosition));
}

function performParagraphJumpOperation(
  editor: vscode.TextEditor,
  op: ParagraphJumpOperation
) {
  switch (op) {
    case ParagraphJumpOperation.moveUp:
    case ParagraphJumpOperation.selectUp:
      {
        const targetLine = getNextLine(editor, LineOperation.up);
        const newPosition = new vscode.Position(targetLine.lineNumber, 0);
        const moveOp =
          op === ParagraphJumpOperation.moveUp
            ? MoveOperation.move
            : MoveOperation.select;
        moveCursor(editor, newPosition, moveOp);
      }
      break;
    case ParagraphJumpOperation.moveDown:
    case ParagraphJumpOperation.selectDown:
      {
        const targetLine = getNextLine(editor, LineOperation.down);
        const newPosition = new vscode.Position(
          targetLine.lineNumber,
          targetLine.text.length
        );
        const moveOp =
          op === ParagraphJumpOperation.moveDown
            ? MoveOperation.move
            : MoveOperation.select;
        moveCursor(editor, newPosition, moveOp);
      }
      break;
  }
}

export function activate(context: vscode.ExtensionContext) {
  let paragraphJumpUp = vscode.commands.registerTextEditorCommand(
    "paragraphjump.up",
    (editor: vscode.TextEditor) => {
      performParagraphJumpOperation(editor, ParagraphJumpOperation.moveUp);
    }
  );

  let paragraphJumpDown = vscode.commands.registerTextEditorCommand(
    "paragraphjump.down",
    (editor: vscode.TextEditor) => {
      performParagraphJumpOperation(editor, ParagraphJumpOperation.moveDown);
    }
  );

  let paragraphSelectUp = vscode.commands.registerTextEditorCommand(
    "paragraphjump.selectup",
    (editor: vscode.TextEditor) => {
      performParagraphJumpOperation(editor, ParagraphJumpOperation.selectUp);
    }
  );

  let paragraphSelectDown = vscode.commands.registerTextEditorCommand(
    "paragraphjump.selectdown",
    (editor: vscode.TextEditor) => {
      performParagraphJumpOperation(editor, ParagraphJumpOperation.selectDown);
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
