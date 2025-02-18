import { BrowserRouter, Router, Route, Link } from 'react-router-dom';
import {
  useEffect,
  useState
} from 'react';
import PostCard from '../components/PostCard.jsx'

export default function home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getpost`);
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6  lg:p-28 p-3 max-w-6xl mx-auto ">
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Yuvraj's Blog</h1>
        <p className='text-xs sm:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, magnam. Placeat atque fugiat provident explicabo aliquam. Ab saepe quisquam placeat, voluptates nam eveniet ipsam nostrum pariatur velit nisi odio aperiam accusamus nobis voluptatibus! Beatae ipsa consequatur commodi eveniet accusantium dolore quis fuga possimus.</p>

      <Link to='/search' className='text-xs sm:text-sm text-teal-500 hover:underline'>
        View all Posts
      </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className="flex flex-wrap gap-3">
                {
                  posts.map((post) => 
                   ( <PostCard key={post._id} post={post}/>)
                  )
                }
              </div>
              <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
                View all posts
              </Link>
            </div>
          )
          }
      </div>
    </div>
  )
}
