import { cn } from '@lib/utils';

type Props = {
  children: React.ReactNode;
  open: boolean;
};

const Modal = ({ children, open }: Props) => {
  const modalClass = cn({
    'modal modal-middle': true,
    'modal-open': open,
  });

  return (
    <div className={modalClass}>
      <div className="sm-relative modal-box fixed top-4 sm:top-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
