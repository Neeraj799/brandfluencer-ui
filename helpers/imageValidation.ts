


export const isValidFileUploaded = (file) => {
    const validExtensions = ["jpg", "png", "jpeg", "gif", "webp"];
    const fileExtension = file.name.split(".").pop().toLowerCase() || '';
    return validExtensions.includes(fileExtension);
  };


