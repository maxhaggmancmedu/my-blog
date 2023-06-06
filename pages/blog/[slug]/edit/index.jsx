import { useRouter } from "next/router";
import BlogEditor from "../../../../components/blog-editor";
import { editPost } from "../../../../api-routes/posts";
import useSWRMutation from "swr/mutation";
import { cacheKey } from "../..";


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

  const { trigger: editTrigger } = useSWRMutation(cacheKey, () => editPost({ slug }));

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    console.log({ editorContent, titleInput, image, slug });
    const { data, status, error } = await editTrigger({
      body: editorContent,
      title: titleInput,   
      image,
      slug 
    });

    if (!error) {
      router.push(`/blog/${slug}`)
    }
  };

  return (
    <BlogEditor
      heading="Edit blog post"
      title={mockData.title}
      src={mockData.image}
      alt={mockData.title}
      content={mockData.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}
