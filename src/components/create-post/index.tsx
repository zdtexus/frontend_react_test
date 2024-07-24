import { Button, Textarea } from "@nextui-org/react";
import { useCreatePostMutation, useLazyGetAllPostsQuery } from "../../app/services/postsApi"
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { IoMdCreate } from "react-icons/io";
export const CreatePost = () => {
    const [createPost] = useCreatePostMutation();
    const [triggerAllPosts] = useLazyGetAllPostsQuery();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue
    } = useForm();

    const error = errors?.post?.message as string;

    const onsubmit = handleSubmit(async (data) =>{
        try {
            await createPost({content: data.post }).unwrap();
            setValue('post', '');
            await triggerAllPosts().unwrap()
        } catch (error) {
            console.log(error)
        }
    })
  return (
    <form className="flex-grow" onSubmit={onsubmit}>
        <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{
            required: 'Required field'
        }}
        render={({ field }) => (
            <Textarea
                {...field }
                labelPlacement="outside"
                placeholder="What do you think"
                className="mb-5"
             />
        )}
         />

         {errors && <ErrorMessage error={ error}/>}

         <Button
         color="success"
         className="flex-end"
         endContent={<IoMdCreate />}
         type="submit"
         >
            Add post
         </Button>
    </form>
  )
}