export const getImageUrl = (image: string | null) => {
  if (!image) {
    return "";
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  return `${baseUrl}/uploads/images/${image}`;
};
