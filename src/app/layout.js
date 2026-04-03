import "./globals.css";

export const metadata = {
  title: "Calculator App",
  description: "Simple Calculator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}