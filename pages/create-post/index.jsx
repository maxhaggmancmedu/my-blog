import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import useSWRMutation from "swr/mutation";
import { cacheKey } from "../blog";
import { useRouter } from "next/router";
import { addPost } from "../../api-routes/posts";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function CreatePost() {
  const router = useRouter()
  const user = useUser()

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    cacheKey,
    addPost
  );

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);

    const newPost = {
      body: editorContent,
      title: titleInput,
      slug,
      user_id: user.id,
      image
    }

    const {status, error } = await addTrigger(newPost)

    console.log(newPost);

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
