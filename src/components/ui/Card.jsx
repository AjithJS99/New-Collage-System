import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
    return (
        <div
            className={twMerge(
                clsx(
                    "bg-white rounded-card shadow-sm border border-slate-100 p-6",
                    "hover:shadow-md transition-shadow duration-300",
                    className
                )
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className }) {
    return <div className={clsx("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }) {
    return <h3 className={clsx("text-lg font-semibold text-slate-800", className)}>{children}</h3>;
}
