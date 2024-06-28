import React, { createContext, useState, useContext } from 'react';
import Toast from './index';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toastVisible, setToastVisible] = useState(false);
    const [toast, setToast] = useState({ title: '', message: '', iconColor: '', iconName: '', bg: '' });

    const showToast = (message, title, iconColor, iconName, bg) => {
        setToastVisible(true);
        setToast({ title, message, visible: true, iconColor, iconName, bg });
        setTimeout(() => {
            setToastVisible(false)
            setToast({ title: '', message: '', visible: false, iconColor: '', iconName: '', bg: '' });
        }, 3000);
    };
    const handleDismiss = () => {
        setToastVisible(false);
      }
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast title={toast.title} onDismiss={handleDismiss} iconName={toast.iconName} iconColor={toast.iconColor} message={toast.message} visible={toastVisible} bg={toast.bg} />
        </ToastContext.Provider>
    );
};