import Form from "./components/Form";

async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getPosts`);
  return res.json();
}

export default async function Home() {
  const posts: { id: number; title: string; content: string }[] =
    await getPosts();

  return (
    <div className="flex justify-center gap-8 p-4 flex-col max-w-5xl mx-auto">
      <Form />
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div className="w-fit flex flex-col gap-4 items-center bg-gray-800 p-6 rounded-lg">
            <h1 key={post.id} className="text-2xl font-medium">
              {post.title}
            </h1>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
