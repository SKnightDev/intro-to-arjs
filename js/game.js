{
    const image = new Image();
    const takePhotoButton = document.querySelector('.takePhoto');
    
    let constraints, imageCapture, mediaStream, video;
    
    const init = () => {
        video = document.querySelector('video');
        navigator.mediaDevices.enumerateDevices()
            .catch(error => console.log('enumerateDevices() error', error))
            .then(getStream);
        
        takePhotoButton.addEventListener('click', getPicture);
    }
    
    // get video stream from the camera
    const getStream = () => {
        
    };
    
    // displays stream from the camera, and then creates an ImageCapture object, using the video stream
    const gotStream = stream => {
        
    };
    
    // take the picture
    const getPicture = () => {
        
    };
    
}