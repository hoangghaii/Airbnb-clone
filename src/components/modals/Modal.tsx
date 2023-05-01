import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IoMdClose } from 'react-icons/io';

import Button from '@/components/Button';
import { useOnClickOutside } from '@/hooks';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
  disabledSecondaryAction?: boolean;
};

const Modal: FC<Props> = ({
  isOpen = false,
  onClose,
  onSubmit,
  title = '',
  body = undefined,
  footer = undefined,
  actionLabel,
  disabled,
  secondaryActionLabel = '',
  secondaryAction,
  disabledSecondaryAction = false,
}: Props) => {
  const [showModal, setShowModal] = useState(isOpen);
  const ref = useRef(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useOnClickOutside(ref, handleClose);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabledSecondaryAction || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabledSecondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="scrollbar-hidden justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div
          ref={ref}
          className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto"
        >
          {/*content*/}
          <div
            className={`
              translate duration-300 h-full
              ${showModal ? 'translate-y-0' : 'translate-y-full'}
              ${showModal ? 'opacity-100' : 'opacity-0'}
           `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col  w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">{body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-ful">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabledSecondaryAction}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
