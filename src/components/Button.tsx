import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'default' | 'small';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export default function Button({
    variant = 'primary',
    size = 'default',
    fullWidth = false,
    className = '',
    children,
    ...props
}: ButtonProps) {
    const classes = [
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
