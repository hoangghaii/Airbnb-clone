import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import LogoImg from '../../../public/images/logo.png';

const Logo: FC = () => {
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src={LogoImg}
      onClick={() => router.push('/')}
    />
  );
};

export default Logo;
