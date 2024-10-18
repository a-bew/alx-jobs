
export const loadImg = (src: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      // img.onerror = () => reject(new Error("could not load image"));
      img.onerror = () => {
        // Image failed to load, resolve with "error" string
        resolve("error");
      };
    });