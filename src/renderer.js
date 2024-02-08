alert('La camara puede tardar en abrir maximo 5 segundos')

const startCameraButton = document.getElementById('btn-start-camera');
const stopCameraButton = document.getElementById('btn-stop-camera');
const startRecordingButton = document.getElementById('btn-start-recording');
const stopRecordingButton = document.getElementById('btn-stop-recording');
const videoElement = document.getElementById('video');
let stream;
let mediaRecorder; 
let recordedChunks = [];

function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(mediaStream) {
                videoElement.srcObject = mediaStream;
                stream = mediaStream;
            })
            .catch(function(error) {
                console.error('Error al acceder a la cámara:', error);
            });
    } else {
        console.error('getUserMedia no está soportado en este navegador');
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
    }
}

function startRecording() {
    if (stream && MediaRecorder.isTypeSupported('video/webm')) {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function(event) {
            recordedChunks.push(event.data);
        };
        mediaRecorder.start();
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grabacion.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

startCameraButton.addEventListener('click', startCamera);
stopCameraButton.addEventListener('click', stopCamera);
startRecordingButton.addEventListener('click', startRecording);
stopRecordingButton.addEventListener('click', stopRecording);


