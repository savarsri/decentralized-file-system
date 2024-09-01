import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Paper, Typography, IconButton, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '../components/NavBar';
import Slider from 'react-slick';

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

export default function Upload() {
    const images = [
        image1,
        image2,
        image3,
    ];

    const settings = {
        dots: false,
        infinite: images.length > 1, // Allow infinite scrolling only if there is more than one image
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: images.length > 1, // Enable autoplay only if there is more than one image
        autoplaySpeed: 2000,
        arrows: false, // Hide arrows
    };


    const [file, setFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertSeverity, setAlertSeverity] = React.useState('success');

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const imageFile = acceptedFiles[0];
            setFile(Object.assign(imageFile, {
                preview: URL.createObjectURL(imageFile),
            }));
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setAlertOpen(false);

        // Simulate an upload process with a 10 seconds delay
        await new Promise((resolve) => setTimeout(resolve, 10000));

        setLoading(false);
        setAlertMessage('Image uploaded successfully!');
        setAlertSeverity('success');
        setAlertOpen(true);
        setFile(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
            'image/heic': [],
            'image/jfif': [],
        },
        multiple: false, // Ensure only one file is uploaded at a time
    });

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    return (
        <>
            <NavBar />
            <div>
                <div className="px-40 grid grid-cols-2" style={{ height: 'calc(100vh - 64px)' }}>


                    <div className="flex items-center justify-center " >
                        <Box sx={{ width: '80%', margin: 'auto' }}>
                            <Slider {...settings}>
                                {images.map((src, index) => (
                                    <div key={index}>
                                        <img src={src} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'fill', }} />
                                    </div>
                                ))}
                            </Slider>
                        </Box>
                    </div>

                    <div className="flex items-center justify-center ">
                        <Box sx={{ width: '100%', margin: 'auto'  }} className="flex items-center justify-center flex-col ">
                            <Paper 
                                {...getRootProps()}
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    color: 'text.secondary',
                                    width: '50%',
                                    borderRadius: '25px',
                                    cursor: 'pointer',
                                    backgroundColor: isDragActive ? '#e0e0e0' : '#ffffff',
                                    transition: 'background-color 0.3s',
                                    boxShadow: '0px 0px 56px rgba(69, 69, 69, 0.2)', // Custom shadow
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                                elevation={0} // Removes the default shadow
                                
                            >
                                <input {...getInputProps()} />
                                <ImageIcon sx={{ fontSize: 40, color: '#9e9e9e' }} />
                                <Typography variant="h6" sx={{ mt: 2, color: '#616161' }}>
                                    Drag & Drop an Image Here
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#616161' }}>
                                    or
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#616161' }}>
                                    Click to Select
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#757575' }}>
                                    (Only one image can be selected)
                                </Typography>
                            </Paper>

                            {file && (
                                <Box sx={{ mt: 4, position: 'relative', textAlign: 'center' }}>
                                    <Paper
                                        sx={{
                                            p: 1,
                                            textAlign: 'center',
                                            backgroundColor: '#fff',
                                           
                                            position: 'relative',
                                        }}
                                    >
                                        <img
                                            src={file.preview}
                                            alt={file.name}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ mt: 1, color: '#616161' }}>
                                            {file.name}
                                        </Typography>
                                        <IconButton
                                            onClick={handleRemoveImage}
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                                },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Paper>

                                    {/* Submit Button */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                        sx={{ mt: 2, width: '200px', borderRadius: '25px' }}
                                        disabled={loading} // Disable button while loading
                                    >
                                        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Upload Image'}
                                    </Button>
                                </Box>
                            )}
                        </Box>

                    </div>
                </div>

                {/* Snackbar for Alert */}
                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </div>

        </>
    );
}
