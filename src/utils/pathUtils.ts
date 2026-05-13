export const getImagePath = (imagePath: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `/sc_journal${imagePath}`;
  }
  return imagePath;
};

export const getDocsDirectoryPath = (relativePath: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `sc_journal/${relativePath}`;
  }
  return `public/${relativePath}`;
};
