import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

import AvatarPlacehoder from '../../public/images/placeholder.jpg';

type Props = {
  imageUrl: string | null | undefined | StaticImageData;
};

const Avatar: FC<Props> = ({ imageUrl = AvatarPlacehoder }: Props) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={imageUrl ? imageUrl : AvatarPlacehoder}
    />
  );
};

export default Avatar;
