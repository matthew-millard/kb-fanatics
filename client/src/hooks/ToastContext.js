/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useMemo } from "react";
import ToastNotification from "../components/ToastNotification/ToastNotification";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const handleCloseToast = () => {
    setToast(null);
  };

  const contextValue = useMemo(() => ({ toast, setToast }), [toast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && <ToastNotification message={toast} onClose={handleCloseToast} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
