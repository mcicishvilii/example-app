import { Head, Link } from '@inertiajs/react';

interface Post {
  id: number;
  title: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  post: Post;
}

export default function BlogShow({ post }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatContent = (content: string) => {
    // Convert line breaks to HTML
    return content.replace(/\n/g, '<br>');
  };

  return (
    <>
      <Head title={`${post.title} - My Blog`} />
      
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
          <article className="bg-white rounded-lg shadow-sm border p-8">
            {/* Back link */}
            <div className="mb-6">
              <Link 
                href="/blog"
                className="text-blue-600 hover:text-blue-800"
              >
                ← Back to all posts
              </Link>
            </div>

            {/* Post header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
              
              <div className="text-gray-500 text-sm">
                Published on {formatDate(post.created_at)}
              </div>
            </header>

            {/* Post content */}
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(post.content) 
                }}
              />
            </div>

            {/* Post footer */}
            <footer className="mt-8 pt-6 border-t">
              <div className="flex justify-between items-center">
                <div className="text-gray-500 text-sm">
                  Last updated: {formatDate(post.updated_at)}
                </div>
                
                <Link 
                  href="/blog"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View All Posts
                </Link>
              </div>
            </footer>
          </article>
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