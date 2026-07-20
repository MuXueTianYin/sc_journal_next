export const getImagePath = (imagePath: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `/sc_journal${imagePath}`;
  }
  return imagePath;
};

/** 静态资源路径（支持中文文件名，自动 encode + basePath） */
export const getAssetPath = (relativePath: string) => {
  const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  const encoded =
    '/' +
    normalized
      .split('/')
      .filter(Boolean)
      .map((segment) => encodeURIComponent(segment))
      .join('/');
  return getImagePath(encoded);
};

export const getDocsDirectoryPath = (relativePath: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `sc_journal/${relativePath}`;
  }
  return `public/${relativePath}`;
};
