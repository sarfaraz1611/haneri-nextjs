"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { getBlogBySlug, BlogData, BlogContent, BlogFAQ } from "@/data/blogs";

function BlogHero({ blog }: { blog: BlogData }) {
  return (
    <section className="bg-gradient-to-b from-[#f8faf9] to-white py-12 md:py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading1 mb-4">{blog.title}</h1>
          <p className="text-[#CA5D27] font-medium text-lg md:text-xl mb-6">
            {blog.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#e9f4f2] text-[#00473E] text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            {blog.intro}
          </p>
        </div>
      </div>
    </section>
  );
}

function ContentRenderer({ content }: { content: BlogContent[] }) {
  return (
    <>
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-gray-700 text-base md:text-lg leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: block.text || "" }}
              />
            );

          case "heading":
            return (
              <h2
                key={index}
                className="text-[#00473E] font-semibold text-2xl md:text-3xl mt-10 mb-4 font-[var(--font-barlow-condensed)]"
              >
                {block.text}
              </h2>
            );

          case "divider":
            return (
              <div
                key={index}
                className="w-24 h-1 bg-[#CA5D27] mx-auto my-10 rounded-full"
              />
            );

          case "highlight":
            return (
              <div
                key={index}
                className="bg-[#e9f4f2] border-l-4 border-[#00473E] p-6 rounded-r-lg my-8"
              >
                <h4 className="text-[#00473E] font-semibold text-lg mb-2">
                  {block.title}
                </h4>
                <p
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: block.text || "" }}
                />
              </div>
            );

          case "list":
            return (
              <ul key={index} className="my-6 space-y-3">
                {block.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-[#00473E] rounded-full mt-2 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            );

          case "feature-grid":
            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8"
              >
                {block.features?.map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-[#00473E] font-semibold text-lg mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "bullets-box":
            return (
              <div
                key={index}
                className="bg-[#f8faf9] border border-gray-200 rounded-xl p-6 my-8"
              >
                <ul className="space-y-3">
                  {block.items?.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-[#00473E] flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

function FAQSection({ faqs }: { faqs: BlogFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="my-12 bg-[#f8faf9] rounded-2xl p-6 md:p-8">
      <h2 className="text-[#00473E] font-semibold text-2xl md:text-3xl mb-6 font-[var(--font-barlow-condensed)]">
        FAQs
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
            open={openIndex === index}
            onClick={(e) => {
              e.preventDefault();
              setOpenIndex(openIndex === index ? -1 : index);
            }}
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-[#00473E] hover:bg-gray-50 transition-colors">
              <span>
                Q{index + 1}. {faq.question}
              </span>
              <svg
                className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
            )}
          </details>
        ))}
      </div>
    </div>
  );
}

function BlogNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="heading1 mb-4">Blog Not Found</h1>
      <p className="text-gray-600 mb-8">
        The blog you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/" className="btn-haneri">
        Back to Home
      </Link>
    </div>
  );
}

function BlogPageContent() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  if (!key) {
    return <BlogNotFound />;
  }

  const blog = getBlogBySlug(key);

  if (!blog) {
    return <BlogNotFound />;
  }

  return (
    <main className="bg-white mt-10">
      <BlogHero blog={blog} />

      <section className="py-8 md:py-12">
        <div className="container">
          <article className="max-w-4xl mx-auto">
            <ContentRenderer content={blog.content} />

            <FAQSection faqs={blog.faqs} />

            <div className="flex justify-center mt-12">
              <Link href="/" className="btn-haneri">
                Explore Products
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default function SingleBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      }
    >
      <BlogPageContent />
    </Suspense>
  );
}
