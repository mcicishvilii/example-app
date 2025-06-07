import { Head, Link } from '@inertiajs/react';

interface Post {
  id: number;
  title: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedPosts {
  data: Post[];
  links: PaginationLink[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Props {
  posts: PaginatedPosts;
}

export default function BlogIndex({ posts }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncateContent = (content: string, limit: number) => {
    if (content.length <= limit) return content;
    return content.substring(0, limit) + '...';
  };

  return (
    <>
      <Head title="Latest Posts - My Blog" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/blog" className="text-2xl font-bold text-gray-800">
                My Blog
              </Link>
              <div className="space-x-4">
                <Link href="/blog" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Latest Posts</h1>
            <p className="text-gray-600">Welcome to my blog! Here are my latest thoughts and updates.</p>
          </div>

          {/* Posts List */}
          {posts.data.length > 0 ? (
            <div className="space-y-8">
              {posts.data.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                >
                  <h2 className="text-2xl font-semibold mb-3">
                    <Link 
                      href={`/blog/${post.id}`}
                      className="text-gray-800 hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  <div className="text-gray-500 text-sm mb-4">
                    Published on {formatDate(post.created_at)}
                  </div>
                  
                  <div className="text-gray-700 mb-4">
                    {truncateContent(post.content.replace(/<[^>]*>/g, ''), 200)}
                  </div>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts published yet.</p>
            </div>
          )}

          {/* Pagination */}
          {posts.links && (
            <div className="mt-8">
              <div className="flex justify-center space-x-2">
                {posts.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url || '#'}
                    className={`px-3 py-2 text-sm leading-4 border rounded hover:bg-gray-100 ${
                      link.active 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700'
                    } ${
                      !link.url ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}