const About = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-8 pl-10">
      <h1 className="text-3xl font-bold">About</h1>

      <p>
        This website is built with{" "}
        <a href="https://nextjs.org" title="Next.js">
          Next.js
        </a>
      </p>

      <div>
        <p>Support for real-world commerce features including: </p>
        <ul className="list-disc pl-5">
          <li>Out of stocks</li>
          <li>Order history</li>
          <li>Order status</li>

          <li>
            Dynamically driven content and features via Shopify (ie.
            collections, menus, pages, etc.)
          </li>

          <li>And more!</li>
        </ul>
      </div>

      <div>
        <p>
          This template also allows us to highlight newer Next.js features
          including:{" "}
        </p>
        <ul className="list-disc pl-5">
          <li>Next.js App Router</li>
          <li>Optimized for SEO using Next.js Metadata</li>
          <li>React Server Components (RSCs) and Suspense</li>
          <li>Route Handlers for mutations</li>
          <li>Edge runtime</li>
          <li>New Next.js 13 fetching and caching paradigms</li>
          <li>Dynamic OG images</li>
          <li>Styling with Tailwind CSS</li>
          <li>Automatic light/dark mode based on system settings</li>
          <li>And more!</li>
        </ul>
      </div>
      <p className="text-sm italic">
        This document was last updated on April 21, 2023.
      </p>
    </div>
  );
};

export default About;
