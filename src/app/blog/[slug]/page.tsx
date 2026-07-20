"use client";

import { use, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";
import { ArrowLeft, Clock, Calendar, Share2, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const [shared, setShared] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal justify-between">
        <Header />
        <main className="flex-grow pt-48 pb-24 text-center space-y-6">
          <h1 className="font-serif text-3xl font-light">Essay Not Found</h1>
          <p className="text-sm text-brand-charcoal/60">The requested article could not be located in our archives.</p>
          <a href="/blog" className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-brand-gold pb-1">
            Back to Archives
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  // Helper to parse bold text inside elements
  const parseMarkdownInline = (text: string) => {
    if (!text.includes("**")) return text;
    const parts = text.split("**");
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="text-brand-charcoal font-semibold">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  const renderBlogContent = (content: string) => {
    const lines = content.replace(/\r\n/g, "\n").split("\n").map((line) => line.trim());
    const elements: React.ReactNode[] = [];

    let currentList: string[] = [];
    let listType: "ul" | "ol" | null = null;

    const flushList = (key: number) => {
      if (currentList.length === 0) return;

      const listItems = currentList.map((item, idx) => {
        const colonIdx = item.indexOf(":");
        if (colonIdx > -1 && item.substring(0, colonIdx).includes("**")) {
          const boldPart = item.substring(0, colonIdx);
          const restPart = item.substring(colonIdx);
          return (
            <li key={idx}>
              {parseMarkdownInline(boldPart)}
              {parseMarkdownInline(restPart)}
            </li>
          );
        }
        return <li key={idx}>{parseMarkdownInline(item)}</li>;
      });

      if (listType === "ul") {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 space-y-2 my-6 text-brand-charcoal/80">
            {listItems}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${key}`} className="list-decimal pl-6 space-y-2 my-6 text-brand-charcoal/80">
            {listItems}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    };

    lines.forEach((line, idx) => {
      if (!line) {
        flushList(idx);
        return;
      }

      // Check for bullet list item
      if (line.startsWith("* ") || line.startsWith("- ")) {
        if (listType !== "ul") {
          flushList(idx);
          listType = "ul";
        }
        currentList.push(line.substring(2));
        return;
      }

      // Check for numbered list item
      if (/^\d+\.\s/.test(line)) {
        if (listType !== "ol") {
          flushList(idx);
          listType = "ol";
        }
        const match = line.match(/^\d+\.\s(.*)/);
        currentList.push(match ? match[1] : line);
        return;
      }

      // If it's a regular line, flush any active list first
      flushList(idx);

      // Check for Headings
      if (line.startsWith("####")) {
        elements.push(
          <h4 key={idx} className="font-serif text-xl sm:text-2xl font-light text-brand-charcoal pt-6 pb-2 tracking-wide leading-tight">
            {line.replace("####", "").trim()}
          </h4>
        );
      } else if (line.startsWith("###")) {
        elements.push(
          <h3 key={idx} className="font-serif text-2xl sm:text-3xl font-light text-brand-charcoal pt-8 pb-3 tracking-wide leading-tight">
            {line.replace("###", "").trim()}
          </h3>
        );
      } else if (line.startsWith("##")) {
        elements.push(
          <h2 key={idx} className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal pt-10 pb-4 tracking-wide leading-tight">
            {line.replace("##", "").trim()}
          </h2>
        );
      }
      // Check for Blockquote
      else if (line.startsWith(">")) {
        elements.push(
          <blockquote key={idx} className="border-l-2 border-brand-gold pl-6 py-2 italic font-serif text-xl text-brand-charcoal/80 my-8 leading-relaxed">
            {line.replace(">", "").replace(/["']/g, "").trim()}
          </blockquote>
        );
      }
      // Standard Paragraph
      else {
        elements.push(
          <p key={idx} className="leading-relaxed text-brand-charcoal/85">
            {parseMarkdownInline(line)}
          </p>
        );
      }
    });

    // Flush any remaining list at the end
    flushList(lines.length);

    return elements;
  };

  const recommendations = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal relative">
      <Header />

      <main className="flex-grow pt-32 pb-24">
        {/* Navigation Breadcrumb */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 mb-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-charcoal/55 hover:text-brand-gold transition-colors duration-300"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Archives
          </a>
        </div>

        {/* Editorial Header */}
        <article className="max-w-4xl mx-auto px-6 md:px-12">
          <header className="space-y-6 mb-12 border-b border-brand-gold/15 pb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium block">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight text-brand-charcoal">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="font-serif text-xl sm:text-2xl font-light italic text-brand-charcoal/70">
                {post.subtitle}
              </p>
            )}

            <div className="flex justify-between items-center flex-wrap gap-4 pt-6 text-xs text-brand-charcoal/50">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" /> {post.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" /> {post.readTime}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-charcoal transition-colors duration-300 cursor-pointer"
              >
                {shared ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied Link
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" /> Share Essay
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Article Body */}
          <div className="blog-content max-w-none text-brand-charcoal/85 leading-[1.8] font-light text-base sm:text-lg space-y-8">
            {renderBlogContent(post.content)}
          </div>
        </article>

        {/* Recommended Reading Footer */}
        {recommendations.length > 0 && (
          <section className="border-t border-brand-gold/15 mt-24 pt-20 max-w-4xl mx-auto px-6 md:px-12">
            <h3 className="font-serif text-2xl font-light mb-10 tracking-wide text-brand-charcoal">Recommended Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {recommendations.map((rec) => (
                <div key={rec.slug} className="border border-brand-gold/15 p-6 rounded-sm bg-brand-ivory/5 flex flex-col justify-between h-[200px]">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-gold font-semibold">{rec.category}</span>
                    <h4 className="font-serif text-lg font-light text-brand-charcoal mt-2 line-clamp-2">
                      <a href={`/blog/${rec.slug}`} className="hover:text-brand-gold transition-colors duration-300">
                        {rec.title}
                      </a>
                    </h4>
                  </div>
                  <a href={`/blog/${rec.slug}`} className="text-[10px] uppercase tracking-widest text-brand-charcoal hover:text-brand-gold font-semibold">
                    Read Essay &rarr;
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
