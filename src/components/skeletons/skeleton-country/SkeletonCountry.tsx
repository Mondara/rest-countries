import React from 'react'
import { Skeleton } from '../skeleton';
import './SkeletonCountry.scss';

export const SkeletonCountry = () => {
    return (
        <div className="skeleton-country-wrapper">
            <div className="skeleton-country">
                <Skeleton type="custom" styles={{ width: "100%", height: "400px" }} />

                <div className="skeleton-country-info">
                    <Skeleton type="title" />
                    {[...Array(5).keys()].map((_, indx) => (
                        <Skeleton key={indx} type="text" />
                    ))}
                    <div className="skeleton-country-info-borders">
                        {[...Array(5).keys()].map((_, indx) => (
                            <Skeleton key={indx} type="custom" styles={{ width: "100px", height: "50px", marginRight: "1em" }} />
                        ))}
                    </div>
                </div>

            </div>


        </div>
    )
};