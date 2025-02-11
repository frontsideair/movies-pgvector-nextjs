type Props = {
  children: React.ReactNode;
};

import "modern-normalize";

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <title>Movies</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
