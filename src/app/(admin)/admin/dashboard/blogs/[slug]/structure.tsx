'use client';

import React, { useContext, useEffect, useState } from 'react'

import style from './structure.module.scss';
import { GlobalContext } from '@/context/global_context';
import { FaGears } from 'react-icons/fa6';
import Editor from '@/components/editor';
import { FaEdit, FaEye, FaSave, FaTrash } from 'react-icons/fa';
import Content from '@/components/editor/content';
import { BlogData } from '../page';
import { slugify } from '@/utils/web';
import { ToggleSwitch } from '@/components/inputs';

type Props = {
    slug: string;
    theme: 'light' | 'dark';
    data: BlogData;
}

export default function Structure(props: Props) {
    const context = useContext(GlobalContext);
    const [data, setData] = useState<BlogData>(props.data);
    const [content, setContent] = useState(props.data?.content || '');
    const [isPreviewMode, setIsPreviewMode] = useState(true);

    useEffect(() => {
        context.setNavbar({
            ...context.navbar,
            extraLinks: [
                ...context.navbar.extraLinks || [],
            ],
            extraButtons: [
                ...context.navbar.extraButtons || [],
            ],
        });

        return () => {
            context.setNavbar({
                ...context.navbar,
                extraLinks: [],
                extraButtons: [],
            });
        };
    }, []);

    function save() {
        // TODO: Save the data
    }

    return (
        <div className={`relative h-full w-full`}>
            <div className={`w-full h-full flex flex-row items-stretch justify-normal`}>

                <div className={`h-full flex-shrink flex-grow w-1/3 min-w-[300px] max-w-[400px] border-r border-[var(--border-primary-color)]`}>
                    <div className={`relative flex flex-col`}>

                        <div className={`p-2 header relative border-b border-[var(--border-primary-color)]`}>
                            <div className={`flex flex-row items-center justify-between gap-2`}>

                                <button className={`${style.button}`} onClick={e => setIsPreviewMode(!isPreviewMode)}>
                                    {isPreviewMode ? <>
                                        <FaEdit />
                                        <span>Edit</span>
                                    </> : <>
                                        <FaEye />
                                        <span>Preview</span>
                                    </>}
                                </button>

                                <button className={`${style.button}`} onClick={save}>
                                    <FaSave />
                                    <span>
                                        Save
                                    </span>
                                </button>

                                <button className={`${style.button}`}>
                                    <FaTrash />
                                    <span>
                                        Delete
                                    </span>
                                </button>

                            </div>
                        </div>

                        <div className={`flex flex-col gap-2 items-stretch justify-start`}>

                            <InputForm
                                id='title'
                                type='text'
                                label='Title'
                                description={`The slug will be as follows: "${slugify(data?.title)}"`}
                                value={data?.title}
                                onChange={e => setData({
                                    ...data,
                                    title: e,
                                })}
                            />

                            <div className={`align-middle px-2 flex flex-row gap-2 items-center`}>
                                <label htmlFor='isPublished' className={`text-sm font-medium`}>Is Published: </label>
                                <ToggleSwitch
                                    id='isPublished'
                                    buttonSize='0.8em'
                                    checked={data?.is_published}
                                    onChange={e => setData({
                                        ...data,
                                        // @ts-ignore
                                        is_published: e.target.checked,
                                    })}
                                />
                            </div>

                            <InputForm
                                id='description'
                                type='text'
                                label='Description'
                                description='The description of the blog.'
                                value={data?.description}
                                onChange={e => setData({
                                    ...data,
                                    description: e,
                                })}
                                isTextArea
                            />

                            <InputForm
                                id='tags'
                                type='text'
                                label='Tags'
                                description='The tags of the blog.'
                                value={data?.tags.join(',')}
                                onChange={e => setData({
                                    ...data,
                                    tags: e.split(','),
                                })}
                                isTextArea
                            />

                        </div>

                    </div>
                </div>

                <div className={`h-full flex-shrink flex-grow w-2/3 border-r border-[var(--border-primary-color)]`}>

                    <div className={`h-full w-full overflow-auto`} style={{
                        display: isPreviewMode ? 'none' : 'block',
                    }}>
                        <Editor
                            id={`${props.slug}`}
                            initialContent=''
                            shouldSaveLocally={true}
                            onContentChange={e => setContent(e)}
                            onSave={e => setContent(e)}
                        />
                    </div>

                    <div className={`h-full w-full overflow-auto`} style={{
                        display: isPreviewMode ? 'block' : 'none',
                    }}>
                        <Content
                            data={content}
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}

function InputForm(props: {
    id: string;
    type?: string;
    label: string;
    description?: string;
    value: string;
    onChange: (value: string) => void;
    isTextArea?: boolean;
}) {
    return <div className={style.form_field}>
        <div className={style.field}>
            {props.isTextArea ? <textarea
                name={props.id}
                id={props.id}
                autoComplete='off'
                required
                value={props.value || ''}
                onChange={e => props.onChange(e.target.value)}
                className={`${style.input} ${(props.value && props.value !== '') ? style.filled : ''}`}
            />
                :
                <input
                    type={props.type || "text"}
                    name={props.id}
                    id={props.id}
                    autoComplete='off'
                    required
                    value={props.value || ''}
                    onChange={e => props.onChange(e.target.value)}
                    className={`${style.input} ${(props.value && props.value !== '') ? style.filled : ''}`}
                />
            }
            <label htmlFor={props.id}>{props.label}</label>
        </div>
        {props.description && <p className={style.description}>{props.description}</p>}
    </div>
}
