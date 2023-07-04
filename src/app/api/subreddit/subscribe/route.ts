import { getAuthSession } from '@/shared/lib/auth/auth';
import { db } from '@/shared/lib/db/db';
import { SubredditSubscriptionValidator } from '@/shared/validators/subreddit';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { subredditId } = SubredditSubscriptionValidator.parse(body);

    // check if user has already subscribed to subreddit
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (subscriptionExists) {
      return new Response("You've already subscribed to this subreddit", {
        status: 400,
      });
    }

    // create community and associate it with the user
    await db.subscription.create({
      data: {
        subredditId,
        userId: session.user.id,
      },
    });

    return new Response(subredditId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      'Could not subscribe to community at this time. Please try later',
      { status: 500 }
    );
  }
}