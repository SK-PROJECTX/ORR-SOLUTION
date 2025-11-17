import { ThemeToggle } from "../components/ThemeToggle"; 

export default function Home() {
  return (
    <div className="min-h-screen w-full p-6 star">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Theme System Demo</h1>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Available Color Variables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary text-white">
                <strong>--color-primary:</strong> Main brand color (#0ec277)
              </div>
              <div className="p-4 rounded-lg bg-lemon text-black">
                <strong>--color-lemon:</strong> Bright accent (#5ef558)
              </div>
              <div className="p-4 rounded-lg bg-card text-white">
                <strong>--color-card:</strong> Card backgrounds
              </div>
              <div className="p-4 rounded-lg bg-gradient-primary text-white">
                <strong>--gradient-primary:</strong> Main gradient
              </div>
            </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Theme Setup</h2>
          <div className="p-6 rounded-lg" style={{backgroundColor: 'var(--color-card)', opacity: 0.8}}>
            <h3 className="text-lg font-medium mb-3">How to use:</h3>
            <ul className="space-y-2 text-sm">
              <li>• CSS Variables: <code>var(--color-primary)</code></li>
              <li>• Tailwind Classes: <code>bg-primary</code>, <code>text-foreground</code></li>
              <li>• Theme toggles between light and dark automatically</li>
              <li>• All colors adapt to the current theme</li>
              <li>• Stars background with radial glow effects</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
