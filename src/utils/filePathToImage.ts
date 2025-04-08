export enum ImageSize {
  W300 = 'w300',
  W780 = 'w780',
  W1280 = 'w1280',
  ORIGINAL = 'original',
}

export const filePathToImage = (filePath: string | null, size: ImageSize = ImageSize.ORIGINAL) => {
  const baseURL = 'http://image.tmdb.org/t/p/';
  return `${baseURL}${size}${filePath}`;
};
