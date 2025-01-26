type Props = {
  children: React.ReactNode;
};

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
