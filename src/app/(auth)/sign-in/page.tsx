import { SignIn } from '@/features/auth/SignIn';
import { buttonVariants } from '@/shared/ui/Button/config';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={
            buttonVariants({ theme: 'ghost', className: 'self-start -mt-20' })
            // 'self-start -mt-20'
          }
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;