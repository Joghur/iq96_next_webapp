import { ErrorResponse } from "@components/ui/typing";

type Props = {
  response: ErrorResponse;
};

export const ErrorToastText = ({ response }: Props) => {
  return (
    <>
      <h5>Data er ikke gemt</h5>
      <p>{`${response.status} - ${response.statusText}`}</p>
    </>
  );
};
