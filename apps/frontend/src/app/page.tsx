import { Header } from "../component/Header";

export default function Home() {
  return (
    <>
      <main className="bg-linear-to-b from-orange-50 to-white overflow-hidden">

        <Header />
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Toastmasters Agenda Builder
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Create professional Toastmasters meeting agendas in minutes — no
            spreadsheets, no stress.
          </p>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center">
            <div>
              <h3 className="text-xl font-semibold">Quick Setup</h3>
              <p className="mt-2 text-gray-600">
                Generate a full agenda by entering roles and timings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Customizable</h3>
              <p className="mt-2 text-gray-600">
                Adjust agenda, evaluations, and special segments.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Share Instantly</h3>
              <p className="mt-2 text-gray-600">
                Export or share agendas with your club in one click.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500">
          © {new Date().getFullYear()} Toastmasters Agenda Builder
        </footer>
      </main>
    </>
  );
}
