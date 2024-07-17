import "@styles/globals.css";
import { Children } from "react";
import Navbar from "@components/Navbar";



export const metadat = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({children}) => {
  return (
    <html Lang="en">
      <body>
        <div className="main">
            <div className="gradient" />

        </div>
      
      <main className="app">
      <Navbar />

        {children}
      </main>
      </body>
    </html>
  );
};

export default RootLayout;
