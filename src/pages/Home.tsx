import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Maximize2, CheckCircle, Award, Users, Globe, Zap, TrendingUp, Calendar, Eye, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRecentNews } from '../utils/newsLoader';
import { getRecentBlogs } from '../utils/blogLoader';
import type { NewsArticle } from '../utils/newsLoader';
import type { BlogArticle } from '../utils/blogLoader';
import SEOHead from '../components/SEOHead';
import NewsletterSubscription from '../components/NewsletterSubscription';

const Home: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [recentNews, setRecentNews] = useState<NewsArticle[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);

  useEffect(() => {
    const loadRecentContent = async () => {
      try {
        const [news, blogs] = await Promise.all([
          getRecentNews(3),
          getRecentBlogs(3)
        ]);
        setRecentNews(news);
        setRecentBlogs(blogs);
      } catch (error) {
        console.error('Error loading recent content:', error);
      } finally {
        setNewsLoading(false);
        setBlogsLoading(false);
      }
    };

    loadRecentContent();
  }, []);

  const togglePlay = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEOHead
        title="Saher Flow Solutions | Leading Multiphase Flow Measurement Technology | Saudi Arabia"
        description="Revolutionary DMOR technology for accurate multiphase flow measurement. Non-radioactive, AI-powered flow meters for oil & gas industry. Made in Saudi Arabia, trusted globally."
        keywords="multiphase flow meter, DMOR technology, oil gas measurement, Saudi Arabia, non-radioactive flow meter, water cut meter, artificial intelligence, digital twin, flow measurement, petroleum engineering, upstream oil gas, production optimization, Saudi Aramco approved, Vision 2030, made in KSA"
        url="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Saher Flow Solutions",
          "url": "https://saherflow.com",
          "logo": "https://saherflow.com/wp-content/uploads/2021/06/Artboard-1-copy100.svg",
          "description": "Leading provider of revolutionary DMOR technology for multiphase flow measurement",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Office # 2112, Second Floor, AL-OLAYAN Building 40, KAUST",
            "addressLocality": "Thuwal",
            "addressCountry": "SA"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966-54-286-2009",
            "contactType": "customer service",
            "email": "contact@saherflow.com"
          }
        }}
      />

      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            id="hero-video"
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            playsInline
            preload="metadata"
            onEnded={() => setIsPlaying(false)}
          >
            <source src="https://res.cloudinary.com/drnak5yb2/video/upload/v1754555754/Saher_Flow_Solutions_-_Revolutionizing_Multiphase_Flow_Measurement_Technology_1_ixqhqr.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-8 right-8 flex gap-3 z-20">
          <button
            onClick={togglePlay}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={toggleMute}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
            aria-label="Fullscreen"
          >
            <Maximize2 size={20} />
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Revolutionizing
              <span className="block text-yellow-400">Flow Measurement</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Non-radioactive, AI-powered multiphase flow meters trusted by Saudi Aramco and energy leaders worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/products"
                className="inline-flex items-center gap-3 bg-yellow-500 text-navy-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-navy-900 transition-all duration-300"
              >
                Schedule Demo
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">Why Choose Saher Flow?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Revolutionary DMOR technology delivering unmatched accuracy and safety
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle size={48} />,
                title: 'Non-Radioactive',
                description: 'Completely safe operation without gamma-ray sources, eliminating health risks and regulatory complexities'
              },
              {
                icon: <Zap size={48} />,
                title: 'AI-Powered Accuracy',
                description: 'Digital twin algorithms deliver ±2% accuracy across all operating conditions with minimal calibration'
              },
              {
                icon: <Award size={48} />,
                title: 'Saudi Aramco Approved',
                description: 'First GCC company to achieve Saudi Aramco pre-qualification for multiphase flow measurement technology'
              },
              {
                icon: <Users size={48} />,
                title: 'Proven Track Record',
                description: 'Successfully deployed across multiple oil fields with consistent performance and customer satisfaction'
              },
              {
                icon: <Globe size={48} />,
                title: 'Global Deployment',
                description: 'No import restrictions or special handling requirements, enabling easy international deployment'
              },
              {
                icon: <TrendingUp size={48} />,
                title: 'Cost Effective',
                description: 'Lower total cost of ownership with reduced maintenance, no radioactive licensing, and extended operational life'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="text-yellow-500 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">Latest News</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Stay updated with our latest achievements and industry developments
            </p>
          </div>

          {newsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="aspect-video bg-gray-300 dark:bg-gray-600"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentNews.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-[1.02]"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {article.featured && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-yellow-500 text-navy-900 px-2 py-1 rounded-full text-xs font-bold">
                          FEATURED
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <time dateTime={article.date} className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(article.date)}
                      </time>
                    </div>

                    <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3 group-hover:text-navy-700 dark:group-hover:text-yellow-400 transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <a
                      href={`/news#${article.slug}`}
                      className="inline-flex items-center gap-2 text-navy-600 dark:text-yellow-400 font-semibold hover:text-yellow-500 transition-colors duration-200 text-sm group-hover:gap-3"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="/news"
              className="inline-flex items-center gap-3 bg-navy-900 dark:bg-yellow-500 text-white dark:text-navy-900 px-8 py-4 rounded-lg font-semibold hover:bg-navy-800 dark:hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
            >
              View All News
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">Expert Insights</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Deep technical insights and industry analysis from our team of experts
            </p>
          </div>

          {blogsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="aspect-video bg-gray-300 dark:bg-gray-600"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBlogs.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-[1.02]"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {article.featured && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-yellow-500 text-navy-900 px-2 py-1 rounded-full text-xs font-bold">
                          FEATURED
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <time dateTime={article.date} className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(article.date)}
                        </time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3 group-hover:text-navy-700 dark:group-hover:text-yellow-400 transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>

                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={article.authorImage}
                        alt={article.author}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150';
                        }}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{article.author}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{article.authorTitle}</div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <a
                      href={`/blogs#${article.slug}`}
                      className="inline-flex items-center gap-2 text-navy-600 dark:text-yellow-400 font-semibold hover:text-yellow-500 transition-colors duration-200 text-sm group-hover:gap-3"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="/blogs"
              className="inline-flex items-center gap-3 bg-navy-900 dark:bg-yellow-500 text-white dark:text-navy-900 px-8 py-4 rounded-lg font-semibold hover:bg-navy-800 dark:hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
            >
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-24 bg-gradient-to-r from-navy-900 to-navy-800 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <NewsletterSubscription />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-yellow-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">Ready to Transform Your Operations?</h2>
          <p className="text-xl text-navy-800 mb-8 max-w-3xl mx-auto">
            Join industry leaders who trust Saher Flow Solutions for their critical flow measurement needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-navy-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-navy-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Schedule Demo
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/products"
              className="inline-flex items-center gap-3 border-2 border-navy-900 text-navy-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-navy-900 hover:text-white transition-all duration-300"
            >
              View Products
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;