import React from 'react';

const colorClasses = {
    primary: 'bg-picton-blue hover:brightness-95 text-white',
    light: 'bg-white hover:brightness-90 text-black',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
};

const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-2 px-6 text-base',
    large: 'py-3 px-8 text-lg',
};

export const Button = ({
    text,
    onClick,
    disabled,
    loading,
    icon,
    size = 'medium',
    variant = 'primary',
    ariaLabel,
    additionalClasses = '',
    type = 'button',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            aria-label={ariaLabel || text}
            className={`flex items-center justify-center ${sizeClasses[size]
                } ${colorClasses[variant]} w-full transition ease-in duration-100 text-center font-semibold shadow-md rounded-lg cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ${additionalClasses}`}
        >
            {text}
            {loading ? (
                <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                    ></path>
                </svg>
            ) : (
                icon && <span className="ml-2">{icon}</span>
            )}
        </button>
    );
};
