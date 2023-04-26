import Image from 'next/image';
import { FC } from 'react';

type Props = {
  imageUrl: string | null | undefined;
};

const Avatar: FC<Props> = ({ imageUrl = '/images/placeholder.jpg' }: Props) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={imageUrl ? imageUrl : '/images/placeholder.jpg'}
    />
  );
};

export default Avatar;
