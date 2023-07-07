'use client'

import React from 'react'

import style from './megamenuslider.module.scss'
import { NavItem } from './structure';
import { FaAngleRight, FaCaretDown } from 'react-icons/fa';
import Link from 'next/link';

type Props = {
    items: NavItem[];
}

export default function MegaMenuSlider({ items }: Props) {
    const [openedMenuIndex, setOpenedMenuIndex] = React.useState(-1);

    return (
        <div className={style.sm_box} data-hide={false}>
            <div className={style.holder}>

                {items.map((item, index) => {
                    if (!item.items) {
                        return (<Link className={style.link_item} href={item.link} key={index}>
                            {item.icon && <span className={style.icon}>{item.icon}</span>}

                            <span className={style.text}>{item.title}</span>
                        </Link>)
                    }

                    if (!item.isMegaMenu) {
                        return (
                            <div key={index} className={style.dropdown_holder} data-open={openedMenuIndex === index}>
                                <span className={`${style.link_item}`} onClick={e => {
                                    setOpenedMenuIndex(openedMenuIndex === index ? -1 : index);
                                }}>
                                    {item.icon && <span className={style.icon}>{item.icon}</span>}

                                    <span className={style.text}>{item.title}</span>

                                    {item.items && <FaCaretDown className={`inline-block align-baseline`} />}
                                </span>

                                <div className={style.sm_dropdown} key={index}>
                                    <ul className={`${style.dropdown_box}`}>
                                        {/* @ts-ignore */}
                                        {item.items.length > 0 ? item.items.map((item, index) => (
                                            <li key={item.title}>
                                                <Link href={item.link}>{item.title}</Link>
                                            </li>
                                        ))
                                            :
                                            <li>
                                                <span>Nothing To Show Here</span>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    }

                    return (
                        <div className={style.mega_box_holder} key={index}>
                            <span className={`${style.link_item}`} onClick={e => {
                                setOpenedMenuIndex(openedMenuIndex === index ? -1 : index);
                            }}>
                                {item.icon && <span className={style.icon}>{item.icon}</span>}

                                <span className={style.text}>{item.title}</span>

                                {item.items && <FaAngleRight className={`inline-block align-baseline`} />}
                            </span>

                            <div className={style.mega_box} data-open={openedMenuIndex === index}>
                                <div className={style.mega_box_container}>
                                    <div className={style.mega_box_content}>
                                        {/* @ts-ignore */}
                                        {item.items}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}