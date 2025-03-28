export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-[80px] px-4 mx-auto max-w-screen-lg">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-1" />
        <div className="col-span-10">{children}</div>
        <div className="col-span-1" />
      </div>
    </main>
  );
}
