import React from 'react'
import style from './style.module.scss';
import Image from 'next/image';
import LogoDark from '@/assets/logo/logo_dark.svg'
import LogoLight from '@/assets/logo/logo_light.svg'
import Logo from '../svgs/logo';

type Props = {}

export default function MainLoader({ }: Props) {
    return (
        <div className={style.mainLoader}>
            <div className={style.centerer}>
                <div className={style.loader}>
                    <div className={style.logo}>
                        {/* <Image
                            src={LogoDark}
                            alt="Logo"
                            height={40}
                        /> */}
                        <Logo
                            height={40}
                            width="auto"
                        />
                        {/* <h2></h2> */}
                    </div>

                    <div className={style.progressBar}>
                    </div>
                </div>
            </div>
        </div>
    )
}