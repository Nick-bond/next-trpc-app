'use client';
import React from 'react';

type ModalProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, onSave, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <div className="space-y-4">{children}</div>
                <div className="flex justify-end mt-6 space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};