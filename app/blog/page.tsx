import fetchSubstackPosts, { SubstackPost } from '../../lib/fetchSubstackPosts';

const Blog = async () => {
  const posts: SubstackPost[] = await fetchSubstackPosts();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Blog Feed</h1>
          <p className="text-gray-600 text-lg">
            Explore the latest posts and updates from our Substack newsletter.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-800"
            >
              {post.imageUrl && (
                <div className="mb-4">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <h2 className="text-2xl font-semibold text-primary mb-2">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.title}
                </a>
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Published on {new Date(post.pubDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {post.contentSnippet}
              </p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-primary font-medium"
              >
                Read more →
              </a>
            </article>
          ))}
        </section>

        <div className="text-center mt-12">
          <a
            href="https://vrushalivip2002.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-dark transition-colors"
          >
            Subscribe to Newsletter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog;
