'use client';
import { useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  FormattingToolbarPositioner,
  HyperlinkToolbarPositioner,
  SideMenuPositioner,
  SlashMenuPositioner,
  ToggledStyleButton,
  Toolbar,
  ToolbarButton,
  useBlockNote,
  useEditorContentChange,
  useEditorSelectionChange,
} from "@blocknote/react";
import "@blocknote/react/style.css";

const CustomFormattingToolbar = (props: { editor: BlockNoteEditor }) => {
  // Tracks whether the text & background are both blue.
  const [isSelected, setIsSelected] = useState<boolean>(
    props.editor.getActiveStyles().textColor === "blue" &&
    props.editor.getActiveStyles().backgroundColor === "blue"
  );

  // Updates state on content change.
  useEditorContentChange(props.editor, () => {
    setIsSelected(
      props.editor.getActiveStyles().textColor === "blue" &&
      props.editor.getActiveStyles().backgroundColor === "blue"
    );
  });

  // Updates state on selection change.
  useEditorSelectionChange(props.editor, () => {
    setIsSelected(
      props.editor.getActiveStyles().textColor === "blue" &&
      props.editor.getActiveStyles().backgroundColor === "blue"
    );
  });

  return (
    <Toolbar>
      {/*Default button to toggle bold.*/}
      <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
      {/*Default button to toggle italic.*/}
      <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
      {/*Default button to toggle underline.*/}
      <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
      {/*Custom button to toggle blue text & background color.*/}
      <ToolbarButton
        mainTooltip={"Blue Text & Background"}
        onClick={() => {
          props.editor.toggleStyles({
            textColor: "blue",
            backgroundColor: "blue",
          });
        }}
        isSelected={isSelected}>
        Blue
      </ToolbarButton>
    </Toolbar>
  );
};

export default function App() {
  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote();

  // Renders the editor instance.
  return (
    <BlockNoteView editor={editor} theme={"dark"}>
      <FormattingToolbarPositioner
        editor={editor}
        formattingToolbar={CustomFormattingToolbar}
      />
      <HyperlinkToolbarPositioner editor={editor} />
      <SlashMenuPositioner editor={editor} />
      <SideMenuPositioner editor={editor} />
    </BlockNoteView>
  );
}