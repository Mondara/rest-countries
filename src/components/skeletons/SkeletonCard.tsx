import React from 'react'
import Shimmer from './Shimmer/Shimmer';
import './SkeletonCard.scss';

export const SkeletonCard = () => {
    return (
        <div className="skeleton-card-wrapper">
            <div className="skeleton-card">
                <div className="skeleton-card-img" />
                {[...Array(5).keys()].map((_, indx) =>
                    <div key={indx} className="skeleton-card-text" />
                )}
            </div>

            <Shimmer />
        </div>
    )
};