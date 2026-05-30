import React from 'react';

import FrontLayout from '../../Layouts/FrontLayout';
import AppHead from '../../Components/AppHead';

const About = () => {
  return (
    <>
      <AppHead
        title="About - Mamorulist"
        meta="Learn about the mission behind Mamorulist, the community-driven anime trigger warning database designed to help viewers browse safely."
      />

      <div className="selection:bg-primary-soft selection:text-primary mx-auto max-w-3xl px-4 py-12 font-sans">
        <header className="border-border mb-12 border-b pb-6">
          <h1 className="text-text mb-2 font-serif text-4xl font-bold">About Mamorulist</h1>
          <p className="text-text-muted text-sm">The Community Anime Trigger Warning Database</p>
        </header>

        <div className="text-text space-y-8 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">Our Mission</h2>
            <p>
              Mamorulist was built to provide a crowd-verified content breakdown for your watchlist.
              Whether you are managing personal sensitivities or simply want to know the specific
              weight of themes in an anime before diving in, this platform aggregates community data
              to let you know what to expect.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">How It Works</h2>
            <p>
              The database relies entirely on community input to map content indicators. Registered
              users submit votes on individual trigger content items per anime using three clear
              metrics:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-text">Presence Tracking:</strong> Users log whether a
                specific content indicator appears in the series.
              </li>
              <li>
                <strong className="text-text">Severity Metrics:</strong> For present content, the
                community rates the intensity across specific tiers: Mild, Moderate, or Severe.
              </li>
              <li>
                <strong className="text-text">Content Framing:</strong> Votes classify the narrative
                tone of the content, labeling it as Serious, Neutral, Romanticized, or Comedic.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">Community Discussions</h2>
            <p>
              To ensure users can find exact details or clarify data, Mamorulist provides two layers
              of open communication boards:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-text">Anime-Wide Discussions:</strong> General boards for
                each title to discuss the series as a whole, its themes, or overall layout.
              </li>
              <li>
                <strong className="text-text">Trigger-Specific Discussions:</strong> Dedicated
                discussion threads embedded directly inside individual trigger content items,
                allowing users to discuss the exact context, episodes, or nuances of that specific
                marker.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">The Project</h2>
            <p>
              Mamorulist is an independent, indie-developed community tool. The project does not run
              third-party ads, sell user data, or gate information behind premium paywalls. It is
              built purely to provide an accessible archive for community safety metrics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">Get in Touch</h2>
            <p>
              If you notice database inaccuracies, want to suggest new warning categories, or have
              general feedback about the application layout, please visit our contact page to drop a
              line.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

About.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default About;
