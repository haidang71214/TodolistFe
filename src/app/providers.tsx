"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/react"; // Sửa từ @heroui/system
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Provider } from "react-redux";

import { store } from "@/store";
import { ModalProvider } from "./Provider/ModalProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}
export function Providers({ children, themeProps }:  Readonly<ProvidersProps>) {
  return (
    // 1. NextThemesProvider PHẢI Ở NGOÀI CÙNG (cung cấp theme context)
    <NextThemesProvider {...themeProps}>
      {/* 2. HeroUIProvider phải nằm TRONG NextThemesProvider */}
      <HeroUIProvider>
        <ModalProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </ModalProvider>
        <ToastProvider placement="bottom-right" />
      </HeroUIProvider>
    </NextThemesProvider>
  );
}