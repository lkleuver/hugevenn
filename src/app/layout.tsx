import * as React from "react";
import "../style/global.scss";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* It's important to keep a head tag, even if it's empty */}
      <head></head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
