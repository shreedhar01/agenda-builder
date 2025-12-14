"use client"
import React from "react";
import { store } from '../state-management/store'
import { Provider } from 'react-redux'
import { Toaster } from "react-hot-toast";

export default function StateProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            {children}
        </Provider>
    )
}