import React, {createContext, useContext, useState} from "react";
import styled, {css, keyframes} from "styled-components";

import InfoIcon from "../assets/icons/info.svg?react";
import WarningIcon from "../assets/icons/warning.svg?react";
import ErrorIcon from "../assets/icons/error.svg?react";

interface NotificationContextType {
  showToast: (msg: string, type: "info" | "warning" | "danger") => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a MobileNotificationProvider");
  }
  return context;
}

interface NotificationItem {
  id: number;
  text: string;
  type: "info" | "warning" | "danger";
  isLeaving: boolean;
}

const NotificationArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0px;
  pointer-events: none;
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUpFadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20%);
  }
`;

const Notification = styled.div<{ leaving?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;

  width: fit-content;
  margin: 0 auto;
  background-color: ${(props) => props.theme.Colors.Background.Standard.Primary};

  border: 1px solid ${(props) => props.theme.Colors.Line.Outline};
  border-radius: 32px;
  padding: 12px 16px;
  overflow: hidden;
  max-height: 200px; /* enough to fit one‑line or multi‑line toast */
  transition: opacity 0.3s ease, transform 0.3s ease, max-height 0.3s ease, padding 0.3s ease;
  font-size: ${(props) => props.theme.Font.Callout.size};
  white-space: pre-line;
  text-align: center;

  animation: ${slideDown} 0.3s ease;

  ${(props) =>
    props.leaving &&
    css`
      animation: ${slideUpFadeOut} 0.3s ease forwards;
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
    `}
`;

export function MobileNotificationProvider({children}: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<NotificationItem[]>([]);

  const showToast = (msg: string, type: "info" | "warning" | "danger" = "info") => {
    const id = Date.now() + Math.random();
    setMessages(prev => [...prev, {id, text: msg, type, isLeaving: false}]);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => m.id === id ? {...m, isLeaving: true} : m)
      );
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== id));
      }, 300);
    }, 2000);
  };

  return (
    <NotificationContext.Provider value={{showToast}}>
      <NotificationArea id="NOTIFICATION">
        {messages.map((m) => (
          <Notification key={m.id} leaving={m.isLeaving}>
            {m.type === "info" ? (<InfoIcon/>) : null}
            {m.type === "warning" ? (<WarningIcon/>) : null}
            {m.type === "danger" ? (<ErrorIcon/>) : null}
            {m.text}
          </Notification>
        ))}
      </NotificationArea>
      {children}
    </NotificationContext.Provider>
  );
}