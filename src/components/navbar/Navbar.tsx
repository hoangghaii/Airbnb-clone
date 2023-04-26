'use client';

import { FC } from 'react';

import Container from '@/components/Container';
import Logo from '@/components/navbar/Logo';
import Search from '@/components/navbar/Search';
import UserMenu from '@/components/navbar/UserMenu';
import { SafeUser } from '@/types';

type Props = {
  currentUser?: SafeUser;
};

const Navbar: FC<Props> = ({ currentUser }: Props) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
