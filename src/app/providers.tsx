
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <>
      {/* gələcəkdə buraya əlavə edə bilərsən:
          AuthProvider
          ThemeProvider
      */}
      {children}
    </>
  );
};

//bunu daha yaxsi et (ReactNodesuz olur?)


//providers islet necese