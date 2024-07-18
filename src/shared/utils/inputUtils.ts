import React from "react";

export const handlePasteDigits = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const filteredText = pastedText.replace(/\D/g, '')
    document.execCommand('insertText', false, filteredText);
    e.preventDefault();
};

export const handlePasteLetters = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const filteredText = pastedText.replace(/[^A-Za-zА-Яа-яЁё\s]/g, '');
    document.execCommand('insertText', false, filteredText);
    e.preventDefault();
};

export const isLetter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === e.key.toUpperCase()) {
        e.preventDefault();
    }
}

export const isDigit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.key >= '0' && e.key <= '9')) {
        e.preventDefault();
    }
}