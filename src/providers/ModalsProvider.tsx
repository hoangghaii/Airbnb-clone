import { FC } from 'react';

import RegisterModal from '@/components/modals/RegisterModal';

const ModalsProvider: FC = () => {
  return (
    <>
      {/* <LoginModal /> */}
      <RegisterModal />
      {/* <SearchModal /> */}
      {/* <RentModal /> */}
    </>
  );
};

export default ModalsProvider;
