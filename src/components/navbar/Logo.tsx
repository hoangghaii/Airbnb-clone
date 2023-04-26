'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const Logo: FC = () => {
  // eslint-disable-next-line no-unused-vars
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src="/images/logo.png"
    />
  );
};

export default Logo;
