import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import useSWRMutation from "swr/mutation";
import { cacheKey } from "../blog";
import { useRouter } from "next/router";
import { addPost } from "../../api-routes/posts";

export default function CreatePost() {
  const router = useRouter()

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    cacheKey,
    addPost
  );

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);

    console.log({ editorContent, titleInput, image, slug });

    const {status, error } = await addTrigger({
      body: editorContent,
      title: titleInput,
      slug
    })

    if (!error) {
      router.push(`/blog/${slug}`)
    }

  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
