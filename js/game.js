{
    const image = new Image();
    const takePhotoButton = document.querySelector('.takePhoto');
    
    let constraints, imageCapture, mediaStream, video;
    
    const markers = document.querySelectorAll('a-marker'),
        numCol = 3, numRow = 3,
        puzzlePieces = numCol * numRow,
        tolerance = 1.9;
    
    let imgPieces = new Array(puzzlePieces),
        puzzle = [...Array(puzzlePieces).keys()].map(String),
        pieces = numCol * numRow - 1,
        positionMarkers = [],
        check = new Array(6);
    
    const init = () => {
        video = document.querySelector('video');
        navigator.mediaDevices.enumerateDevices()
            .catch(error => console.log('enumerateDevices error', error))
            .then(getStream);
        
        takePhotoButton.addEventListener(`click`, getPicture);
        console.log('initialized');
    }
    
    // get video stream from the camera
    const getStream = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
        
        constraints = {
            video: {
                width: 720,
                height: 720
            }
        };
        
        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotStream)
            .catch(error => {
                console.log('getUserMedia error', error);
            });
    };
    
    // displays stream from the camera, and then creates an ImageCapture object, using the video stream
    const gotStream = stream => {
        mediaStream = stream;
        video.srcObject = stream;
        imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
        
    };
    
    // take the picture
    const getPicture = () => {
        imageCapture.takePhoto()
            .then((img) => {
                image.src = URL.createObjectURL(img);
                image.addEventListener('load', () => createImagePieces(image));
                setInterval(() => checkDistance(), 1000);
                console.log(puzzle);
            })
            .catch((error) => {
                console.log('takePhoto error', error);
            });
    };
    
    const createImagePieces = image => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const pieceWidth = image.width / numCol;
        const pieceHeight = image.height / numRow;
        
        /*for (let i = 0; i < numCol; i++) {
            for (let j = 0; j < numRow; j++) {
                ctx.drawImage(image, i * pieceWidth, j * pieceHeight, pieceWidth, pieceHeight, 0, 0, canvas.width, canvas.height);
                imgPieces[8 - pieces] = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                pieces = pieces - 3;
                if (pieces < 0) {
                    pieces = (puzzlePieces - 1) + pieces;
                }
            }
        }*/

        for (let y = 0; y < numRow; y++) {
            for (let x = 0; x < numCol; x++) {
                ctx.drawImage(image, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, canvas.width, canvas.height);
                imgPieces[y * numCol + x] = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                console.log(imgPieces);
            }
        }
        
        markers.forEach((marker, i) => {
            const aImg = document.createElement('a-image');
            
            aImg.setAttribute('rotation', '-90 0 0');
            aImg.setAttribute('position', '0 0 0');
            aImg.setAttribute('src', imgPieces[puzzle[i]]);
            marker.appendChild(aImg);
        });        
    }

    window.addEventListener(`load`, () => setTimeout(() => init(), 1000));
}