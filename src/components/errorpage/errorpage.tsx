import React from 'react'
import './errorpage.scss';

interface Props {
    error: string
}

export const Errorpage: React.FC<Props> = ({ error }) => {
    return (
        <div className="error-page">
            <h1>{error}</h1>
        </div>
    )
}

