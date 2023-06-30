import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React, { FC, useCallback } from 'react';
import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
};

const CategoryBox: FC<Props> = ({
  icon: Icon,
  label,
  selected = false,
}: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    const updatedQuery: any = {
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3
        border-b-2 hover:text-neutral-800 hover:-translate-y-2 
        transition mtransition cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
