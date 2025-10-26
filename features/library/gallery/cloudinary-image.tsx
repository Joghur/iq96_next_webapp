/** biome-ignore-all lint/suspicious/noExplicitAny: <TODO> */
"use client";

import { CldImage } from "next-cloudinary";

//TODO: fix any
const CloudinaryImage = (props: any) => {
	return <CldImage {...props} />;
};

export default CloudinaryImage;
