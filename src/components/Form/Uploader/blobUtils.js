export const uploadBlob = ({ blob, fileName, bucket, onUpload, onProgress }) => {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    fd.append("file", blob, fileName);
    xhr.open("PUT", `/api/v1/storage/${bucket}`, true);

    xhr.onload = (e) => {
        if (xhr.status === 201) {
            onUpload(null, JSON.parse(xhr.response));
        } else if (xhr.status === 422) {
            const err = new Error("Validation failed");
            err.data = JSON.parse(xhr.response);
            onUpload(err, null);
        } else {
            onUpload(e, null);
        }
    };

    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            onProgress(parseInt((e.loaded / e.total) * 100, 10));
        }
    };

    xhr.send(fd);
    return xhr;
};

export const b64toBlob = (dataUrl) => {
    const block = dataUrl.split(";");
    const contentType = block[0].split(":")[1];
    const b64Data = block[1].split(",")[1];
    const sliceSize = 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i += 1) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
};
