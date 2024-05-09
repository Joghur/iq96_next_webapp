export const epochToDateTime = (epoch: number | undefined) => {
  if (!epoch || epoch === 0) return "na";

  return new Date(epoch)
    .toISOString() //yyyy-mm-ddThh:mm:ss.000Z format
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, ""); // removes .000Z part
};

export const epochToDate = (epoch: number | undefined) => {
  if (!epoch || epoch === 0) return "na";

  return new Date(epoch)
    .toISOString() //yyyy-mm-ddThh:mm:ss.000Z format
    .replace(/T.+Z$/, ""); // removes everything between T and Z
};
