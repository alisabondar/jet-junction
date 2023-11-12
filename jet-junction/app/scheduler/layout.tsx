export default function SchedulerLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        🛩️ Jet Junction
      </div>
      <nav></nav>

      {children}
    </section>
  )
}