import { Toaster } from "sonner";

export default function VoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <Toaster
        richColors
        position="top-right"
      />
    </>
  );
}