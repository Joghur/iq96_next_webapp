import { isErrorResponse } from '@components/ui/typing';
import ErrorMessage from './ErrorMessage';

type Props = {
  response: unknown;
};

const ErrorResponse = ({ response }: Props) => {
  if (response && isErrorResponse(response)) {
    return (
      <ErrorMessage message={`${response?.status} - ${response?.statusText}`} />
    );
  } else {
    return <ErrorMessage message="Ingen data fundet" />;
  }
};

export default ErrorResponse;
