import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([
        {
            id: crypto.randomUUID(),
            message: 'Success! You did it!',
            variant: 'success',
        },
        {
            id: crypto.randomUUID(),
            message: 'Oh no! Something went wrong!',
            variant: 'error',
        }
    ]);

    function createToast(message, variant) {
        const nextToasts = [
            ...toasts,
            {
                id: crypto.randomUUID(),
                message,
                variant,
            },
        ];

        setToasts(nextToasts);
    }

    function dismissToast(id) {
        const nextToasts = toasts.filter((toast) => toast.id !== id);
        setToasts(nextToasts);
    }

    return (
        <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
