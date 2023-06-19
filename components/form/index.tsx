// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// interface Props<T extends FieldValues> {
//   onSubmit: SubmitHandler<T>;
//   formSchema: 
// }

// const Form = <T extends object>({ onSubmit, formSchema }: Props<T>) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<T>({
//     resolver: zodResolver(formSchema),
//   });

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
//         <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
//           <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
//             <form
//               className="space-y-4 md:space-y-6"
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Your username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
//                   placeholder="Your name"
//                   {...register("username")}
//                 />{" "}
//                 {errors.username && (
//                   <span className="mt-2 block text-red-800">
//                     {errors.username?.message}
//                   </span>
//                 )}
//               </div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full rounded-lg bg-slate-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
//               >
//                 Create an account
//               </button>
//               {/* <div>
//                 <label
//                   htmlFor="email"
//                   className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Your email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
//                   placeholder="name@company.com"
//                   {...register("email")}
//                 />
//                 {errors.email && (
//                   <span className="mt-2 block text-red-800">
//                     {errors.email?.message}
//                   </span>
//                 )}
//               </div> */}
//               {/* <div>
//                 <label
//                   htmlFor="password"
//                   className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="••••••••"
//                   {...register("password")}
//                   className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
//                 />
//                 {errors.password && (
//                   <span className="mt-2 block text-red-800">
//                     {errors.password?.message}
//                   </span>
//                 )}
//               </div> */}
//               {/* <div>
//                 <label
//                   htmlFor="confirm-password"
//                   className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Confirm password
//                 </label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   placeholder="••••••••"
//                   {...register("confirmPassword")}
//                   className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
//                 />
//                 {errors.confirmPassword && (
//                   <span className="mt-2 block text-red-800">
//                     {errors.confirmPassword?.message}
//                   </span>
//                 )}
//               </div> */}
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Form;
