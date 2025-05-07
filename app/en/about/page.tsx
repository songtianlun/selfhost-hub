import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About SelfHost Hub",
  description: "Learn about the mission and goals of SelfHost Hub",
  openGraph: {
    locale: "en_US",
  },
}

export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">About SelfHost Hub</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          SelfHost Hub is dedicated to collecting, organizing, and promoting quality self-hosted services and tools to
          help you regain data sovereignty.
        </p>

        <h2>Our Mission</h2>
        <p>
          In an era where data is increasingly concentrated in the hands of a few large tech companies, we believe
          everyone should have the right and ability to control their own data. SelfHost Hub aims to provide a
          comprehensive repository to help tech enthusiasts, privacy advocates, and organizations find suitable
          self-hosted solutions.
        </p>

        <h2>Why Self-Hosting?</h2>
        <ul>
          <li>
            <strong>Data Privacy</strong> - Keep your data under your own control
          </li>
          <li>
            <strong>Customization Flexibility</strong> - Tailor and adjust services to your needs
          </li>
          <li>
            <strong>Cost Efficiency</strong> - Self-hosting is often more economical than subscription services in the
            long run
          </li>
          <li>
            <strong>Learning Opportunity</strong> - Gain valuable knowledge about system administration and networking
          </li>
          <li>
            <strong>Independence</strong> - Reduce reliance on external services
          </li>
        </ul>

        <h2>How Our Content is Organized</h2>
        <p>
          Our directory organizes a vast collection of carefully selected self-hosted services and tools, categorized
          using a tag system. This allows you to easily find solutions that match specific needs, whether it's media
          servers, productivity tools, or smart home systems.
        </p>
        <p>
          Each entry contains basic information, feature descriptions, and links to deployment guides to help you
          quickly understand and decide if it's right for your needs.
        </p>

        <h2>Contributing</h2>
        <p>
          SelfHost Hub is a community-driven project, and we welcome your contributions! If you know of a quality
          self-hosted tool we haven't included yet, or if you find information that needs updating, please visit our
          GitHub repository to submit your suggestions.
        </p>
      </div>
    </div>
  )
}
