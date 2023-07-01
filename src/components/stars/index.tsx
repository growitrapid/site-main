import React from 'react'
import style from './style.module.scss'

type Props = {}

export default function Stars({ }: Props) {
    return (
        <div className={`${style.container}`}>
            <div className={`${style.stars}`}></div>
            <div className={`${style.stars}`}></div>
            <div className={`${style.stars}`}></div>
        </div>
    )
}