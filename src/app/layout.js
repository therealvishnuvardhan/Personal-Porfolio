import "./globals.css";

export const metadata = {
  title: "Munipalle Vishnu Vardhan - Portfolio",
  description: "AI & Data Science Student | Full-Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
