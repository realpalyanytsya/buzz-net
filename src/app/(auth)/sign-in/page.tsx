import { SignIn } from '@/features/auth';
import { buttonVariants } from '@/shared/ui/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={buttonVariants({
            theme: 'ghost',
            className: '-mt-20 self-start'
          })}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <SignIn />
      </div>
    </div>
  );
}
