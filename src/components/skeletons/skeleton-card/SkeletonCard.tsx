import React from 'react'
import './SkeletonCard.scss';

import { Skeleton } from '../skeleton';

export const SkeletonCard = () => {
    return (
        <div className="skeleton-card-wrapper">

            <Skeleton type="custom" styles={{ width: '100%', minHeight: '150px', margin: 0 }} />
            <div className="skeleton-card-text">
                {[...Array(5).keys()].map((_, indx) =>
                    <Skeleton type="text" key={indx} styles={{ marginBottom: '0.8em' }} />
                )}
            </div>

        </div>
    )
};