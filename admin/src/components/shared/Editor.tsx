import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { draftToMarkdown } from "markdown-draft-js";
import "assets/css/editor.css";

const ControlledEditor = (props: any) => {
  const [editorState, setEditorState] = useState<EditorState>();
  const [md, setMd] = useState<string>("");
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setMd(draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
    props.set({
      ...props.state,
      contents: draftToMarkdown(convertToRaw(editorState.getCurrentContent())),
    });
  };

  return (
    <div className="demo-root">
      <div className="demo-section">
        <div className="demo-section-wrapper">
          <div style={{ border: 1 }}>
            <div className="editor">
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlledEditor;
