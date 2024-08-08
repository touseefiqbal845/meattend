import React, { useCallback, useState, ChangeEvent, DragEvent } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import "../../assets/css/drag-and-drop.css";
interface DragDropFileUploadProps {
    onFileUpload: (file: File) => void;
    fontWeight?: string | number,
    fontSize?: string | number,
    title?: string | number

}

function DragDropFileUpload({
    onFileUpload,
    fontWeight,
    fontSize,
    title

}: DragDropFileUploadProps) {
    const [dragOver, setDragOver] = useState(false);

    const handleDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((event: DragEvent) => {
        event.preventDefault();
        setDragOver(false);
    }, []);

    const handleDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault();
            setDragOver(false);
            if (event.dataTransfer.files && event.dataTransfer.files[0]) {
                onFileUpload(event.dataTransfer.files[0] as File);
            }
        },
        [onFileUpload]
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                onFileUpload(event.target.files[0] as File);
            }
        },
        [onFileUpload]
    );

    return (
        <>
            <Typography
                fontWeight={fontWeight}
                color={"black"}
                mb={1}
                fontSize={fontSize}
                mt={2}
            >
                {title}
            </Typography>
            <Paper
                variant="outlined"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    height: "217px",
                    border: dragOver ? '2px dashed #FFC000' : '2px dashed #FFC000',
                    borderRadius: 12,
                    padding: 20,
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: dragOver ? '#eee' : '#ffff',

                }}
            >
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleChange}
                />
                <label htmlFor="raised-button-file" >
                    <Box display="flex" flexDirection="column" alignItems="center" sx={{
                        marginTop: '80px',
                        // marginBottom: '70'
                    }}>
                        <Box display="flex">

                            <Typography sx={{
                                fontSize: { md: "17px", sm: "14px", xs: "12px" },
                                textWrap: 'nowrap',
                                fontWeight: 500,
                                lineHeight: "20px",
                                textAlign: "left",
                                color: "#A0A3B5",

                            }}>Drag and drop file or <span className='primary-color bold-500'> Browse</span> </Typography>
                        </Box>
                        <Typography sx={{
                            paddingTop: '10px',
                            fontSize: { md: "13px", xs: "12px" },
                            fontWeight: 400,
                            lineHeight: { md: "16.32px", xs: '24px' },
                            letterSpacing: "0em",
                            textAlign: "center",
                            color: "#C7CADA",
                        }}>Only JPRG, PNG, GIF and PDF  files with max size 25 MB</Typography>
                    </Box>
                </label>
            </Paper >
        </>
    );
}

export default DragDropFileUpload;
