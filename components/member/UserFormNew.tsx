// "use client";

// import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react";
// import Form from "react-bootstrap/Form";
// import { toast } from "react-toastify";

// import ManyFormItems from "@/components/ui/form/ManyFormItems";
// import { FormItemEventTarget } from "@/components/ui/form/OneFormItem";
// import { errorToast } from "@/components/ui/toast/ErrorToast/errorToast";
// import { hasId } from "@/utils/typing";

// import styles from "./SubmitterForm.module.css";
// import { basicSubmitterFormBuilder } from "../../app/iq96/FormHelper";
// import { formHandleOnChange } from "@components/ui/form";

// type Props = {
//   dataSubmitter: SubmitterApiData;
// };

// const SubmitterForm = ({ dataSubmitter }: Props) => {
//   const router = useRouter();

//   const { content: contentSubmitter, ...apiMetaDataSubmitter } = dataSubmitter;
//   const [submitter, setSubmitter] = useState<SubmitterFormData>({
//     ...contentSubmitter,
//   });

//   if (!dataSubmitter) {
//     return <ErrorMessage message="Ingen data modtaget" />;
//   }

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     let response: unknown;

//     if (apiMetaDataSubmitter.id !== 0) {
//       response = await editSubmitter(apiMetaDataSubmitter, submitter);
//     } else {
//       response = await createSubmitter(submitter);
//     }

//     if (hasId(response) && response.id) {
//       toast("Data er gemt", {
//         type: "success",
//       });
//       router.refresh();
//       router.push("/submitters");
//     } else {
//       errorToast(response);
//     }
//   };

//   const handleOnChange = (eventTarget: FormItemEventTarget) => {
//     if (eventTarget.id === "priority" && eventTarget.value === "undefined") {
//       setSubmitter((prev) => ({ ...prev, priority: undefined })); // this will delete priority when sent to API
//       return;
//     }

//     formHandleOnChange<SubmitterFormData>(eventTarget, submitter, setSubmitter);
//   };

//   const submitterWithPriorityAsString: SubmitterFormDataResolved = {
//     ...submitter,
//     priority: submitter.priority ?? "undefined",
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <ManyFormItems<SubmitterFormDataResolved>
//         builderArray={basicSubmitterFormBuilder}
//         data={submitterWithPriorityAsString}
//         onChange={handleOnChange}
//       />
//       <PrimaryButton
//         type="submit"
//         className={styles.buttonSpacing}
//       >
//         Gem
//       </PrimaryButton>
//     </Form>
//   );
// };
// export default SubmitterForm;
