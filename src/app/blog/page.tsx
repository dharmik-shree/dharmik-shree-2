"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";

export default function BlogArchivesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Vastu Shastra", "Conscious Parenting", "Spiritual Mentorship", "Vedic Science"];

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal relative">
      <Header />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block">
            The Wisdom Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-tight text-brand-charcoal">
            Essays & Reflections
          </h1>
          <p className="text-sm font-light leading-relaxed text-brand-charcoal/60 max-w-xl mx-auto">
            Deep-dive explorations into Vedic spatial planning, conscious lineage, and ancient alignments rewritten for the modern seeker.
          </p>
        </div>

        {/* Categories Menu */}
        <div className="flex justify-center border-b border-brand-gold/10 pb-6 mb-16 flex-wrap gap-4 sm:gap-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs uppercase tracking-widest pb-2 transition-all duration-300 font-serif cursor-pointer ${
                selectedCategory === category
                  ? "text-brand-gold border-b-2 border-brand-gold font-medium"
                  : "text-brand-charcoal/50 hover:text-brand-charcoal"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((blog) => (
            <article
              key={blog.slug}
              className="bg-brand-ivory border border-brand-gold/15 p-8 flex flex-col justify-between h-[380px] shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm"
            >
              <div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-brand-gold font-medium mb-6">
                  <span>{blog.category}</span>
                  <span className="text-brand-charcoal/40">{blog.readTime}</span>
                </div>
                <h3 className="font-serif text-2xl text-brand-charcoal font-light leading-snug mb-4 hover:text-brand-gold transition-colors duration-300">
                  <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                </h3>
                <p className="text-xs text-brand-charcoal/60 font-light leading-relaxed line-clamp-4">
                  {blog.excerpt}
                </p>
              </div>
              <div className="pt-4 border-t border-brand-charcoal/5 flex justify-between items-center">
                <span className="text-[10px] text-brand-charcoal/40 font-medium">{blog.publishDate}</span>
                <a
                  href={`/blog/${blog.slug}`}
                  className="text-[10px] uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors duration-300 font-semibold"
                >
                  Read Essay &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
