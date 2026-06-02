const About = () => {
  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900">
            About Myrage
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Connecting talented professionals with amazing opportunities. Our
            platform helps job seekers discover their next career move while
            helping companies find the right talent.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>

          <p className="text-slate-600 leading-relaxed">
            We believe that finding the right job should be simple, transparent,
            and accessible to everyone. Our goal is to bridge the gap between
            talented individuals and companies looking for exceptional people.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-4xl mb-3">🔍</div>

            <h3 className="text-xl font-semibold mb-2">Discover Jobs</h3>

            <p className="text-slate-600">
              Browse opportunities from companies across different industries
              and locations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-4xl mb-3">⚡</div>

            <h3 className="text-xl font-semibold mb-2">Easy Applications</h3>

            <p className="text-slate-600">
              Apply to jobs quickly and track your applications through a simple
              and intuitive interface.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-4xl mb-3">🏢</div>

            <h3 className="text-xl font-semibold mb-2">Top Companies</h3>

            <p className="text-slate-600">
              Connect with startups, growing businesses, and established
              organizations looking for talent.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-blue-600 text-white rounded-2xl p-10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold">1000+</h3>
              <p className="mt-2">Jobs Posted</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">500+</h3>
              <p className="mt-2">Companies</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">5000+</h3>
              <p className="mt-2">Applications Submitted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
