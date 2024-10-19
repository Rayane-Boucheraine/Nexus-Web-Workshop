"use client";

import Auth from "@/components/Auth";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default Auth(Layout);
