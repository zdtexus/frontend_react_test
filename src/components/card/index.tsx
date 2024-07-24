import { useEffect, useState } from "react";
import { CardBody, CardFooter, CardHeader, Card as NextUiCard, Spinner } from "@nextui-org/react";
import { useLikePostMutation, useUnLikePostMutation } from "../../app/services/likeApi";
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from "../../app/services/postsApi";
import { useDeleteCommentMutation } from "../../app/services/commentApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurrent } from "../../features/user/userSlice";
import { formatToClientData } from "../../utils/format-to-client-data";
import { RiDeleteBinLine } from "react-icons/ri";
import { Typography } from "../typography";
import { MetaInfo } from "../meta-info";
import { FcLike } from "react-icons/fc";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { ErrorMessage } from "../error-message";
import { User } from "../user";

type Props = {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor: "comment" | "post" | "current-post";
  likesByUser?: boolean; // значение будет передаваться из данных API
};

export const Card: React.FC<Props> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentCount = 0,
  createdAt,
  id = "",
  cardFor = "comment",
  likesByUser = false,
}) => {
  const [likePost] = useLikePostMutation();
  const [unLikePost] = useUnLikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deleteComment, { isLoading: isDeletingComment }] = useDeleteCommentMutation();
  const [deletePost, { isLoading: isDeletingPost }] = useDeletePostMutation();
  const [currentLikedByUser, setCurrentLikedByUser] = useState(likesByUser);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrent);

  useEffect(() => {
    setCurrentLikedByUser(likesByUser);
  }, [likesByUser]);

  const refetchPosts = async () => {
    try {
      switch (cardFor) {
        case "post":
          await triggerGetAllPosts().unwrap();
          break;
        case "current-post":
        case "comment":
          await triggerGetPostById(id).unwrap();
          break;
        default:
          throw new Error("Invalid cardFor argument");
      }
    } catch (err) {
      console.error("Error refetching posts:", err);
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (currentLikedByUser) {
        await unLikePost(id).unwrap();
      } else {
        await likePost({ postId: id }).unwrap();
      }
      setCurrentLikedByUser(prev => !prev);
      await refetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case "current-post":
          await deletePost(id).unwrap();
          navigate("/");
          break;
        case "comment":
          await deleteComment(id).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error("Invalid cardFor argument");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-non text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientData(createdAt)}
          />
        </Link> 
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {isDeletingPost || isDeletingComment ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleLikeToggle}>
              <MetaInfo
                count={likesCount}
                Icon={currentLikedByUser ? FcLike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link className="cursor-pointer" to={`/posts/${id}`}>
              <MetaInfo count={commentCount} Icon={FaRegComment} />
            </Link>
          </div>
          {error && <ErrorMessage error={error} />}
        </CardFooter>
      )}
    </NextUiCard>
  );
};
