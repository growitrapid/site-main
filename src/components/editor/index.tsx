'use client'

import React, { useState, useRef, useEffect } from 'react'
import prismComponents from "prismjs/components";
// import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor';
// @ts-ignore
// import { CloudinaryUnsigned } from 'puff-puff/CKEditor';
import EditorToolbarConfig from './editor-toolbar.config';

// Collect all languages from prismjs
const languages = ["plane", ...Object.keys(prismComponents.languages).filter(e => ![
    "meta",
    "django"
].includes(e)).sort()];

type Props = {
    id: string;
    initialContent: string;
    shouldSaveLocally: boolean;
    update?: number;
    deleteLocalContent?: () => void;
    onSave?: (content: string) => void;
    onContentChange?: (content: string) => void;
}

export default function Editor(props: Props) {
    const id = (props.id || "default") + ".editor";
    const localData = localStorage.getItem(id);
    const initialContent = ((localData && localData !== "") ? localData : props.initialContent) || "";

    // Get editor config from editor-toolbar.config.ts
    const editorConfig = useRef(EditorToolbarConfig({ ...props, languages: (languages) }));
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [data, setData] = useState(initialContent);
    const EditorRef = useRef<CKEditor<CustomEditor>>() as React.MutableRefObject<CKEditor<CustomEditor>>;

    // File Upload Adapter
    // const FileUploadAdapter = (editor: any) => {
    //     editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    //         return new CloudinaryUnsigned(
    //             loader,
    //             'di9pwtpmy',
    //             'posts_content',
    //             [160, 500, 1000, 1052]
    //         );
    //     };
    // }

    // editorConfig.current.extraPlugins.push(FileUploadAdapter);

    useEffect(() => {
        if (isEditorReady) {
            EditorRef.current.shouldComponentUpdate = () => false;
        }
    }, [props.update]);

    return (
        <CKEditor
            ref={EditorRef}
            editor={CustomEditor}
            data={initialContent}
            config={editorConfig.current}
            id={id}
            onReady={() => setIsEditorReady(true)}
            onChange={(event, editor) => {
                const data = editor.getData();

                if (typeof props.onContentChange === "function") {
                    props.onContentChange(data);
                }

                if (props.shouldSaveLocally) {
                    localStorage.setItem(id, data);
                }
            }}
        />
    )
}