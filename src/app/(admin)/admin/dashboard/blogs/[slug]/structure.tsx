'use client';

import React, { useContext, useEffect, useState } from 'react'

import style from './structure.module.scss';
import { GlobalContext } from '@/context/global_context';
import Editor from '@/components/editor';
import { FaAngleRight, FaEdit, FaEye, FaSave, FaTrash } from 'react-icons/fa';
import Content from '@/components/editor/content';
import { BlogData } from '../page';
import { slugify } from '@/utils/web';
import { ToggleSwitch } from '@/components/inputs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type Props = {
    slug: string;
    theme: 'light' | 'dark';
    data: BlogData;
}

export default function Structure(props: Props) {
    // const context = useContext(GlobalContext);
    const pathname = usePathname();
    const [data, setData] = useState<BlogData>(props.data);
    const [isSaving, setIsSaving] = useState(false);
    const [content, setContent] = useState(props.data?.content || '');
    const [updateContent, setUpdateContent] = useState(new Date().getTime());
    const [isPreviewMode, setIsPreviewMode] = useState(true);
    const [isPanelOpened, setIsPanelOpened] = useState(false);

    function save() {
        if (!data) return;
        if (isSaving) return;

        setIsSaving(true);

        fetch(`${pathname}/api`, {
            method: 'POST',
            body: JSON.stringify({
                id: data._id,
                data: {
                    ...data,
                    content,
                },
                type: 'update'
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            console.log(res);
            setIsSaving(false);
        }).catch(err => {
            console.error(err);
            setIsSaving(false);
        });
    }

    return (
        <div className={`relative h-full w-full`}>
            <div className={`w-full h-full flex flex-row items-stretch justify-normal`}>

                <div className={`h-full absolute lg:relative top-0 left-0 z-20 lg:z-0
                    flex-shrink flex-grow w-[calc(100%-34.18px-16px)] lg:w-1/3 max-w-[400px]
                    border-r border-[var(--border-primary-color)] bg-[var(--bg-color)]
                    transition-transform duration-300 ease-in-out
                    ${isPanelOpened ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}>
                    <SideBar
                        isPreviewMode={isPreviewMode}
                        setIsPreviewMode={setIsPreviewMode}
                        onSaveFunc={save}
                        isSaving={isSaving}
                        slug={props.slug}
                        setUpdateContent={setUpdateContent}
                        data={data}
                        setData={setData}
                    />
                </div>

                <div className={`absolute top-0 left-0 z-10 p-2
                    w-full h-full
                    transition-all duration-300 ease-in-out
                    ${isPanelOpened ? 'bg-[rgba(var(--tertiary-color-rgb,0.5))]' : 'bg-transparent pointer-events-none'}
                    lg:hidden lg:pointer-events-none
                `} onClick={e => setIsPanelOpened(false)}>

                    <button className={`absolute bottom-2 left-2 z-10 p-2
                        transition-all duration-300 ease-in-out pointer-events-auto
                        ${isPanelOpened ? 'translate-x-[400px] rotate-180' : 'translate-x-0'}
                        border border-[var(--border-primary-color)] rounded-full bg-[var(--tertiary-color)] shadow-md
                        hover:bg-[var(--hover-color)] hover:shadow-lg
                    `} onClick={e => {
                            e.stopPropagation();
                            setIsPanelOpened(!isPanelOpened)
                        }}>
                        <FaAngleRight />
                    </button>

                </div>

                <div className={`h-full flex-shrink flex-grow w-2/3 border-r border-[var(--border-primary-color)]`}>

                    <div className={`h-full w-full overflow-auto`} style={{
                        display: isPreviewMode ? 'none' : 'block',
                    }}>
                        <Editor
                            id={`${props.slug}`}
                            update={updateContent}
                            initialContent={content}
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

function SideBar({
    isPreviewMode,
    setIsPreviewMode,
    onSaveFunc,
    isSaving,
    slug,
    setUpdateContent,
    data,
    setData,
}: {
    isPreviewMode: boolean;
    setIsPreviewMode: (value: boolean) => void;
    onSaveFunc: () => void;
    isSaving: boolean;
    slug: string;
    setUpdateContent: (value: number) => void;
    data: BlogData;
    setData: (value: BlogData) => void;
}) {
    return <div className={`h-full relative flex flex-col`}>

        <div className={`p-2 header relative border-b border-[var(--border-primary-color)]`}>
            <div className={`flex flex-row items-center justify-between gap-2 overflow-auto whitespace-nowrap`}>

                <button className={`${style.button}`} onClick={e => setIsPreviewMode(!isPreviewMode)}>
                    {isPreviewMode ? <>
                        <FaEdit />
                        <span>Edit</span>
                    </> : <>
                        <FaEye />
                        <span>Preview</span>
                    </>}
                </button>

                <button className={`${style.button}`} onClick={onSaveFunc} disabled={isSaving}>
                    <FaSave />
                    <span>
                        Save
                    </span>
                </button>

                <button className={`${style.button}`} onClick={e => {
                    // Warning: This will delete the blog permanently.
                    const id = (slug || "default") + ".editor";
                    const localData = localStorage.getItem(id);
                    if (!localData || localData === "") return;

                    if (!confirm('Are you sure you want to delete the local content?')) return;

                    localStorage.removeItem(id);
                    setUpdateContent(new Date().getTime());
                }}>
                    <FaTrash />
                    <span>
                        Delete Local
                    </span>
                </button>

            </div>
        </div>

        <div className={`flex flex-col flex-grow h-full gap-2 items-stretch justify-start overflow-y-auto`}>

            <InputForm
                id='title'
                type='text'
                label='Title'
                description={`The slug will be as follows: "${slugify(data?.title)}"`}
                value={data?.title}
                onChange={e => setData({
                    ...data,
                    title: e,
                    slug: slugify(e),
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
                description='The tags of the blog. Separate tags with a comma (,).'
                value={data?.tags.join(',')}
                onChange={e => setData({
                    ...data,
                    tags: e.split(','),
                })}
                isTextArea
            />

            <div className={style.form_field}>
                <div className={style.image_field}>
                    <label htmlFor='blog__image' className={`text-sm font-medium`}>
                        <Image
                            src={data?.image || '/images/placeholder.png'}
                            alt='Blog Image'
                            width={400}
                            height={400}
                            className={`rounded-md`}
                        />
                    </label>
                    {/* <input
                            type='file'
                            id='blog__image'
                            name='blog__image'
                            accept='image/*'
                            className={`hidden`}
                            onChange={e => {
                                const inputTarget = e.target;
                                if (!inputTarget.files) return;
                                const file = inputTarget.files[0];
                                // if (!file) return;

                                const formData = new FormData();
                                formData.append('image', file);

                                fetch('/api/global', {
                                    method: 'POST',
                                    body: formData,
                                }).then(res => {
                                    console.log(res)
                                }).catch(err => {
                                    console.error(err);
                                });
                            }}
                        /> */}
                    <p>Upload a new image to replace the old one.</p>
                    <input
                        type="text"
                        name="blog__image"
                        id="blog__image"
                        className={style.input}
                        autoComplete='off'
                        required
                        value={data?.image || ''}
                        onChange={e => setData({
                            ...data,
                            image: e.target.value,
                        })}
                    />
                    <p>Enter the sanity deployed link.</p>
                </div>
            </div>

        </div>

    </div>
}
