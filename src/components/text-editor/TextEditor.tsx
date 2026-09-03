import { useRef, forwardRef, useImperativeHandle } from "react";

// import Button from "@mui/material/Button";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonUnderline,
  MenuButtonBulletedList,
  MenuButtonOrderedList,
  MenuButtonBlockquote,
  MenuButtonCode,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuButtonHorizontalRule,
  RichTextEditor,
} from "mui-tiptap";
import type {
  RichTextEditorRef,
} from "mui-tiptap";

interface TextEditorProps {
  defaultValue?: string;
}

export interface TextEditorHandle {
  getHTML: () => string;
}

export const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  function TextEditorComponent(
    { defaultValue = "<p>Description of the venue...</p>" },
    ref,
  ) {
    const textEditorRef = useRef<RichTextEditorRef>(null);

    useImperativeHandle(
      ref, () => ({
        getHTML: () => textEditorRef.current?.editor?.getHTML() ?? ""
      }),
      [],
    );

    return (
      <div>
        <RichTextEditor
          ref={textEditorRef}
          extensions={[StarterKit]}
          content={defaultValue}
          sx={{
            width: "100%",
            "& .ProseMirror": {
              minHeight: 250,
              maxHeight: 500,
              overflowY: "auto",
            },
          }}
          renderControls={() => (
            <MenuControlsContainer>
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
              <MenuButtonUnderline />
              <MenuDivider />
              <MenuButtonBulletedList />
              <MenuButtonOrderedList />
              <MenuDivider />
              <MenuButtonBlockquote />
              <MenuButtonCode />
              <MenuButtonHorizontalRule />
              <MenuDivider />
            </MenuControlsContainer>
          )}
        />

        {/* debugging */}
        {/* <Button
          variant="contained"
          onClick={() => console.log(textEditorRef.current?.editor?.getHTML())}
        >
          Log HTML
        </Button>*/}
      </div>
    )
  })
