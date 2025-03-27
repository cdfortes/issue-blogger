
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostDetail from "@/components/blog/PostDetail";

const PostPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Post Content */}
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="container-narrow">
          <PostDetail />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostPage;
