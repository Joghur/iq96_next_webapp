export type ErrorMessageType = 'Kan ikke vælge formtype' | 'Ingen Data';


type Props = {
message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
  <div className="flew justify-items-center">
    <span className="h2">{message}</span>
  </div>
)
};

export default ErrorMessage