import "./globals.css";
export const metadata = { title: "Botlly | لوحة الإدارة", description: "منصة اكتشاف الشركات وإدارة عروض المواقع" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ar" dir="rtl"><body>{children}</body></html>; }
