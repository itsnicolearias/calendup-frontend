import PublicNavbar from "@/components/landing-page/landing/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <main>{children}</main>
    </>
  );
}
