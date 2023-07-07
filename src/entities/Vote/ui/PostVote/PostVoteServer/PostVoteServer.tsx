import { PostId, PostWithVotes } from '@/entities/Post/model/types/post';
import { getAuthSession } from '@/shared/lib/auth/auth';
import { Vote, VoteType } from '@prisma/client';
import { notFound } from 'next/navigation';
import { PostVoteClient } from '../PostVoteClient/PostVoteClient';

interface PostVoteServerProps {
  postId: PostId;
  initialVotesAmount?: number;
  initialVote?: VoteType;
  getData?: () => Promise<PostWithVotes | null>;
}

export async function PostVoteServer({
  postId,
  initialVote,
  initialVotesAmount,
  getData
}: PostVoteServerProps) {
  const session = await getAuthSession();

  let _votesAmt: number = 0;
  let _currentVote: Vote['type'] | null | undefined = undefined;

  if (getData) {
    // fetch data in component
    const post = await getData();
    if (!post) return notFound();

    _votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1;
      if (vote.type === 'DOWN') return acc - 1;
      return acc;
    }, 0);

    _currentVote = post.votes.find(
      (vote) => vote.userId === session?.user?.id
    )?.type;
  } else {
    // passed as props
    _votesAmt = initialVotesAmount!;
    _currentVote = initialVote;
  }

  return (
    <PostVoteClient
      postId={postId}
      initialVotesAmount={_votesAmt}
      initialVote={_currentVote}
    />
  );
}
