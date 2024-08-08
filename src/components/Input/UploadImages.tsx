
import React, { useCallback, useState, ChangeEvent, DragEvent } from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface DragDropFileUploadProps {
  onFileUpload: (file: Blob, setImage: React.Dispatch<React.SetStateAction<string | null>>) => void;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  fontWeight?: string | number;
  fontSize?: string | number;
  title?: string | number;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function DragDropFileUpload({
  onFileUpload,
  setImage,
  fontWeight,
  fontSize,
  title,
  value,
  onChange,
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
        onFileUpload(event.dataTransfer.files[0] as Blob, setImage);
      }
    },
    [onFileUpload, setImage]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      
      if (event.target.files && event.target.files[0]) {
        onFileUpload(event.target.files[0] as Blob, setImage);

      }
    },
    [onFileUpload, setImage]
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
                  width: "56%",
          height: "6vh",
          border: dragOver ? '2px dashed #FFC000' : '2px dashed #FFC000',
          borderRadius: 12,
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#eee' : '#ffff',
          position: 'relative',
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
        <label htmlFor="raised-button-file">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography
              sx={{
                fontSize: { md: "12px", sm: "9px", xs: "9px" },
                textWrap: 'nowrap',
                fontWeight: 500,
                lineHeight: "20px",
                textAlign: "left",
                color: "#A0A3B5",
              }}
            >
              Upload Image
            </Typography>
          </Box>
        </label>
      </Paper>
    </>
  );
}

export default DragDropFileUpload;

