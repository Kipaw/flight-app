import Script from "next/script";

const baseUrl =
  process.env.NEXT_PUBLIC_MIDTRANS_API_URL ??
  "https://app.sandbox.midtrans.com";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        src={`${baseUrl}/snap/snap.js`}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? ""}
      />
    </>
  );
}
