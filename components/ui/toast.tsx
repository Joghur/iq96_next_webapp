export type ToastLevel = 'info' | 'success' | 'error' | 'warning';

interface Props {
  message: string;
  level: ToastLevel;
}

// TODO need work - animations and a working colour
// Doesn't change colour with template literal
const Toast = ({ message, level }: Props) => {
  return (
    <div className="toast-middle toast">
      <div className={`alert alert-${level}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
