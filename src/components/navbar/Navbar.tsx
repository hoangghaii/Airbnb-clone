import { FC } from 'react';

import Container from '@/components/Container';
import Logo from '@/components/navbar/Logo';
import Search from '@/components/navbar/Search';
import UserMenu from '@/components/navbar/UserMenu';
import { SafeUser } from '@/types';

type Props = {
  currentUser: SafeUser | null;
};

// eslint-disable-next-line no-unused-vars
const Navbar: FC<Props> = ({ currentUser = null }: Props) => {
  return (
    <div className="scrollbar-hidden fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
