export const metadata = { title: "Бележник" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="bg"><body style={{ fontFamily: "system-ui", maxWidth: 640, margin: "40px auto" }}>{children}</body></html>);
}
