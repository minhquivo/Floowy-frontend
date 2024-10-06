import React, { useState, useEffect, useRef } from "react";
import { Camera, X, Loader, RefreshCw } from "lucide-react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

const MoodDetectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedEmotion, setDetectedEmotion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading models:", err);
        setError(
          "Failed to load emotion detection models. Please try again later."
        );
        setIsLoading(false);
      }
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    setIsModalOpen(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
      setError(
        "Failed to access the camera. Please make sure you've granted the necessary permissions."
      );
    }
  };

  const stopCamera = () => {
    setIsModalOpen(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setDetectedEmotion(null);
    setError(null);
    startCamera();
  };

  const detectEmotions = async () => {
    if (capturedImage) {
      setIsProcessing(true);
      setError(null);
      try {
        const img = await faceapi.fetchImage(capturedImage);
        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        if (detections.length > 0) {
          const emotions = detections[0].expressions;
          const detectedEmotion = Object.entries(emotions).reduce((a, b) =>
            a[1] > b[1] ? a : b
          )[0];
          setDetectedEmotion(detectedEmotion);
        } else {
          setError(
            "No face detected. Please ensure your face is clearly visible and try again."
          );
        }
      } catch (err) {
        console.error("Error during emotion detection:", err);
        setError(
          "An error occurred during emotion detection. Please try again."
        );
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleContinue = () => {
    // Implement navigation to the next screen here
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl font-bold leading-tight">
          We detect your mood and use it to personalize your playlists
        </h1>
        <p className="text-xl text-green-400">Try now</p>
        <div className="mt-10">
          <button
            className="p-8 bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors duration-200"
            aria-label="Start mood detection"
            onClick={startCamera}
            disabled={isLoading}
          >
            <Camera className="w-20 h-20" />
          </button>
        </div>
        {isLoading && (
          <p className="mt-4">Loading emotion detection models...</p>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Take a Picture</h2>
              <button
                onClick={stopCamera}
                className="text-gray-400 hover:text-white focus:outline-none"
                aria-label="Close camera"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg"
              ></video>
              <canvas
                ref={canvasRef}
                className="hidden"
                width="640"
                height="480"
              ></canvas>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={captureImage}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Capture Image
              </button>
            </div>
          </div>
        </div>
      )}

      {capturedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Captured Image</h2>
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full rounded-lg mb-4"
            />
            {!detectedEmotion && !isProcessing && (
              <div className="flex justify-between">
                <button
                  onClick={retakePicture}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <RefreshCw className="w-5 h-5 mr-2 inline" />
                  Retake
                </button>
                <button
                  onClick={detectEmotions}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Detect Emotion
                </button>
              </div>
            )}
            {isProcessing && (
              <div className="flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-green-500" />
                <span className="ml-2">Detecting emotion...</span>
              </div>
            )}
            {detectedEmotion && (
              <div className="mt-4 text-center">
                <p className="text-lg">
                  Detected emotion:{" "}
                  <span className="font-bold text-green-400">
                    {detectedEmotion}
                  </span>
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={retakePicture}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <RefreshCw className="w-5 h-5 mr-2 inline" />
                    Retake
                  </button>
                  <button
                    onClick={handleContinue}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodDetectionScreen;
