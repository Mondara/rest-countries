import React from 'react'
import './skeleton.scss';

import { Shimmer } from '../Shimmer';

interface Props {
    type: string;
    styles?: React.CSSProperties;
}


export const Skeleton: React.FC<Props> = ({ type, styles }) => {
    const classes = `skeleton ${type}`;

    return (
        <>
            <div className={classes} style={styles}>
                <Shimmer />
            </div>
        </>
    )
}
