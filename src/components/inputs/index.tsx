import React from 'react'
import style from './style.module.scss'

export function ToggleSwitch(props: React.DelHTMLAttributes<HTMLInputElement> & {
    buttonSize?: React.CSSProperties['fontSize'];
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className={style.toggleSwitch} style={{
            fontSize: props.buttonSize || '1rem',
        }}>
            <input
                type="checkbox"
                {...props}
                checked={props.checked}
                onChange={props.onChange}
                className={`${style.switch} ${props.className || ''}`}
            />
            <label htmlFor={props.id} className={style.switch_label}>Toggle</label>
        </div>
    )
}