import React, { ChangeEvent, useState, useCallback } from "react";
import { Box, Grid, Input, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IndexProps {
  handleFileUpload: (file: Blob, fileType: string, action: string) => void;
}

const Index: React.FC<IndexProps> = ({ handleFileUpload }) => {
  const [videos, setVideos] = useState<(string | undefined)[]>(Array(3).fill(undefined));

  const removeMedia = useCallback((index: number) => () => {
    setVideos(prevVideos => {
      const newVideos = [...prevVideos];
      newVideos[index] = undefined;
      return newVideos;
    });
  }, []);

  const handleMediaChange = useCallback((index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      const inputRef = event.target;

      reader.onload = () => {
        const result = reader.result as string;

        if (!videos.includes(result)) {
          handleFileUpload(file, 'video', 'add');
          setVideos(prevVideos => {
            const newVideos = [...prevVideos];
            newVideos[index] = result;
            return newVideos;
          });
        } else {
          alert(`Video already exists! Please choose another.`);
        }

        inputRef.value = '';
      };

      reader.onerror = (error) => {
        console.error('File reading error:', error);
      };

      reader.readAsDataURL(file); // Read video files as data URLs
    }
  }, [handleFileUpload, videos]);

  return (
    <>
      <div className="photo-heading">
        <b>Add Video</b> <span className="max-text">(Max 3)</span>
      </div>
      <Grid container xs={12} spacing={2}>
        {videos.map((video, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={4} >
            <VideoUploader
              media={video}
              onChange={handleMediaChange(index)}
              onRemove={removeMedia(index)}
              handleFileUpload={handleFileUpload}
              label="Upload Video"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

interface MediaBoxProps {
  media: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  label: string;
}

function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const VideoUploader: React.FC<MediaBoxProps & { handleFileUpload: (file: Blob, fileType: string, action: string) => void }> = ({ media, onChange, onRemove, label, handleFileUpload }) => {
  const handleRemove = () => {
    onRemove();

    if (media) {
      const blob = dataURLtoBlob(media);
      handleFileUpload(blob, 'video', 'removeVideo');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 'auto',
        height: "150px",
        overflow: "hidden",
        borderRadius: '10px',
        textAlign: "center",
        background: "#ffff",
        border: "2px dashed #FFC000",
        marginTop: "40px",
        marginLeft: "3px",
        position: "relative", 
        transition: "none",
      }}
      onClick={() => {
        if (!media) {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'video/*';
          fileInput.style.display = 'none';
          fileInput.onchange = onChange as unknown as (this: GlobalEventHandlers, ev: Event) => any;
          fileInput.click();
        }
      }}
    >
      <Input
        type="file"
        onChange={onChange}
        style={{ display: "none" }}
        inputProps={{
          accept: "video/*",
        }}
      />
      {media && (
        <>
          <video
            src={media}
            controls
            style={{
                objectFit: "cover",
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
              zIndex: 1,
              color: "black",
            //   backgroundColor: "rgba(0, 0, 0, 0.5)", 
              borderRadius: "50%", 
              width: "24px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleRemove}
          >
            <CloseIcon />
          </Box>
        </>
      )}
      {!media && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ marginTop: "50px" }}
        >
          <Box display="flex">
            <Typography
              sx={{
                fontSize: { lg:"11px",md: "9px", sm: "9px", xs: "9px" },
                textWrap: "nowrap",
                marginTop: "20px",
                fontWeight: 500,
                lineHeight: "20px",
                textAlign: "left",
                color: "#A0A3B5",
              }}
            >
              {label}
            </Typography>
          </Box>
          <Typography
            sx={{
              paddingTop: "10px",
              fontSize: { md: "13px", xs: "12px" },
              fontWeight: 400,
              marginTop: "20px",
              lineHeight: { md: "16.32px", xs: "24px" },
              letterSpacing: "0em",
              textAlign: "center",
              color: "#C7CADA",
            }}
          ></Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Index;
