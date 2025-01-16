import React, { useState, Dispatch, SetStateAction } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'; 
import dynamic from 'next/dynamic';
import { Finding } from '../../types/types';
const Editor = dynamic(
() => import('react-draft-wysiwyg').then(mod => mod.Editor),
{ ssr: false })  

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const WWEditor : React.FC<{setFunction : Dispatch<SetStateAction<string>> }> = ({setFunction}) => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());



 const onEditorStateChange = (editorState : any ) => {
    setEditorState(editorState);
    convertToRaw(editorState.getCurrentContent())
    setFunction(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    
};

    return (
      <div style={{border:'1px solid #f1f3f5'}}>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={editorState => onEditorStateChange(editorState)}
      />
      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}
    </div>
    )
}

export default WWEditor