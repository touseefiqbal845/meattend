import React, { ChangeEvent, useState, useCallback } from "react";
import { Box, Grid, Input, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IndexProps {
  handleFileUpload: (file: Blob, fileType: string, action: string) => void;
  fileType: string;
}

const Index: React.FC<IndexProps> = ({ handleFileUpload, fileType }) => {
  const [images, setImages] = useState<(string | undefined)[]>(
    Array(3).fill(undefined)
  );

  const removeMedia = useCallback(
    (index: number) => () => {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = undefined;
        return newImages;
      });
    },
    []
  );

  const handleMediaChange = useCallback(
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();

        const inputRef = event.target;

        reader.onload = () => {
          const result = reader.result as string;

          const isDuplicate = images.includes(result);

          if (!isDuplicate) {
            handleFileUpload(file, "image", "add");
            setImages((prevImages) => {
              const newImages = [...prevImages];
              newImages[index] = result;
              return newImages;
            });
          } else {
            alert(`Image already exists! Please choose another.`);
          }

          inputRef.value = "";
        };

        reader.onerror = (error) => {
          console.error("File reading error:", error);
        };
        reader.readAsDataURL(file);
      }
    },
    [handleFileUpload, images]
  );

  return (
    <>
      <Grid container lg={12} md={12} sm={12} spacing={2} mt={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
            <Typography
              sx={{
                color: "#262A45",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
              }}
            >
              Upload Your Image
            </Typography>
            <ImageUploader
              media={image}
              onRemove={removeMedia(index)}
              onChange={handleMediaChange(index)}
              label="Upload"
              handleFileUpload={handleFileUpload}
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
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const ImageUploader: React.FC<
  MediaBoxProps & {
    handleFileUpload: (file: Blob, fileType: string, action: string) => void;
  }
> = ({ media, onChange, onRemove, label, handleFileUpload }) => {
  const handleRemove = () => {
    onRemove();
    if (media) {
      const blob = dataURLtoBlob(media);
      handleFileUpload(blob, "image", "removeImage");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "110px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        textAlign: "center",
        background: "#ffff",
        border: "2px dashed #FFC000",
        marginTop: "25px",
      }}
      onClick={() => {
        if (!media) {
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "image/*";
          fileInput.style.display = "none";
          //@ts-ignore
          fileInput.onchange = onChange;
          fileInput.click();
        }
      }}
    >
      <Input
        type="file"
        onChange={onChange}
        style={{ display: "none" }}
        inputProps={{
          accept: "image/*",
        }}
      />
      {media && (
        <>
          <Box
            component="img"
            alt="media"
            src={media}
            width="100%"
            height="100%"
            sx={{
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            <CloseIcon onClick={handleRemove} />
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
                fontSize: { md: "14px", sm: "9px", xs: "9px" },
                textWrap: "nowrap",
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
