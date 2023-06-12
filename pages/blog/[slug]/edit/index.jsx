import { useRouter } from "next/router";
import BlogEditor from "../../../../components/blog-editor";
import { editPost } from "../../../../api-routes/posts";
import useSWRMutation from "swr/mutation";
import { cacheKey } from "../..";
import useSWR from 'swr'
import { createSlug } from "../../../../utils/createSlug";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const mockData = {
  title: "Community-Messaging Fit",
  body: "<p>This is a good community fit!</p>",
  image:
    "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg",
};

export default function EditBlogPost() {
  const router = useRouter();
  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;
  
  const { data: { data = [] } = {}, error } = useSWR(`${cacheKey}${slug}`, () => getPost({ slug }));
  const  id  = data.id
  
  const { trigger: editTrigger } = useSWRMutation(cacheKey, editPost);

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    
    const newSlug = await titleInput
    const slug = createSlug(newSlug)
    
    const { data, status, error } = await editTrigger({
      title: titleInput,   
      body: editorContent,
      image,
      slug,
      id
    });

    if (!error) {
      router.push(`/blog/${slug}`)
    }
  };

  return (
    <BlogEditor
      heading="Edit blog post"
      title={data.title}
      src={mockData.image}
      alt={data.title}
      content={data.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx)
  const { slug } = ctx.params;

  const { data: { session }} = await supabase.auth.getSession()

  const { data } = await supabase
  .from('posts')
  .select()
  .single()
  .eq('slug', slug) 

  const isAuthor = data.user_id === session.user.id

  if (!isAuthor) {
    return {
      redirect: {
        destination: `/blog/${slug}`,
        permanent: true
      }
    }
  }

  return {
    props: {}
  }
}
