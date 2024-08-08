import React, { ChangeEvent, useState, useCallback } from "react";
import { Box, Grid, Input, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";

interface IndexProps {
  handleFileUpload: (file: Blob, fileType: string, action: string) => void;
  fileType: string;
}

const Index: React.FC<IndexProps> = ({ handleFileUpload, fileType }) => {
  const [images, setImages] = useState<(string | undefined)[]>(
    Array(5).fill(undefined)
  );
  const [imagess, setImagess] = useState<(string | undefined)[]>(
    Array(3).fill(undefined)
  );
  const [videos, setVideos] = useState<(string | undefined)[]>(
    Array(3).fill(undefined)
  );

  const removeMedia = useCallback(
    (index: number, mediaType: string) => () => {
      switch (mediaType) {
        case "image":
          setImages((prevImages) => {
            const newImages = [...prevImages];
            console.log("removed Image", newImages);
            console.log(
              "images state  after going to  parent",
              images,
              newImages
            );
            newImages[index] = undefined;
            console.log("removed Image", newImages);
            console.log(
              "images state sec after going to  parent",
              images,
              newImages
            );

            return newImages;
          });
          break;
        case "menu":
          setImagess((prevImagess) => {
            const newImagess = [...prevImagess];
            newImagess[index] = undefined;
            return newImagess;
          });
          break;
        case "video":
          setVideos((prevVideos) => {
            const newVideos = [...prevVideos];
            newVideos[index] = undefined;
            return newVideos;
          });
          break;
        default:
          break;
      }
    },
    []
  );

  const handleMediaChange = useCallback(
    (index: number, mediaType: string) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const reader = new FileReader();

          const inputRef = event.target; // Store reference to the input element

          reader.onload = () => {
            const result = reader.result as string;

            // Check if the new media is not a duplicate
            const isDuplicate =
              (mediaType === "image" && images.includes(result)) ||
              (mediaType === "video" && videos.includes(result)) ||
              (mediaType === "menu" && imagess.includes(result));

            if (!isDuplicate) {
              // Update the state based on the media type
              switch (mediaType) {
                case "image":
                  handleFileUpload(file, "image", "add");
                  setImages((prevImages) => {
                    const newImages = [...prevImages];
                    newImages[index] = result;
                    return newImages;
                  });
                  break;
                case "video":
                  handleFileUpload(file, "video", "add");
                  setVideos((prevVideos) => {
                    const newVideos = [...prevVideos];
                    newVideos[index] = result;
                    return newVideos;
                  });
                  break;
                case "menu":
                  handleFileUpload(file, "menu", "add");
                  setImagess((prevImagess) => {
                    const newImagess = [...prevImagess];
                    newImagess[index] = result;
                    return newImagess;
                  });
                  break;
                default:
                  break;
              }
            } else {
              alert(`${mediaType} already exists! Please choose another.`);
            }

            inputRef.value = "";
          };

          reader.onerror = (error) => {
            console.error("File reading error:", error);
            // Handle error
          };
          if (mediaType === "video") {
            reader.readAsDataURL(file); // Read video files as data URLs
          } else {
            reader.readAsDataURL(file); // Read image files as data URLs
          }
        }
      },
    [
      handleFileUpload,
      images,
      setImages,
      videos,
      setVideos,
      imagess,
      setImagess,
    ]
  );

  return (
    <>
      <div className="photo-heading">
        <b> Add Images </b> <span className="max-text">(Max 5)</span>
      </div>

      <Grid container md={12} sm={12} spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={12} md={4} lg={2.4} xl={2.4}  key={index}>
            <ImageUploader
              media={image}
              onRemove={removeMedia(index, "image")}
              onChange={handleMediaChange(index, "image")}
              label="Upload Photos"
              handleFileUpload={handleFileUpload}
            />
          </Grid>
        ))}
      </Grid>

      <div className="photo-heading">
        <b>Upload Menue</b> <span className="max-text">(Max 3)</span>
      </div>
      <Grid container xs={12} spacing={2}>
        {imagess.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <ImageUploaders
              media={image}
              onChange={handleMediaChange(index, "menu")}
              onRemove={removeMedia(index, "menu")}
              handleFileUpload={handleFileUpload}
              label="Upload Menue"
            />
          </Grid>
        ))}
      </Grid>
      {/* <Grid container style={{gap:"40px"}} >
        {videos.map((video, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}  style={{padding:"0px"}}>
            <VideoUploader
              media={video}
              onChange={handleMediaChange(index, 'video')}
              onRemove={removeMedia(index, 'video')}
              handleFileUpload={handleFileUpload}
              label="Upload Video"
            />
          </Grid>
        ))}
      </Grid> */}
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
    // Call the onRemove callback provided by the parent component
    onRemove();

    if (media) {
      // Convert the data URL string to a Blob
      const blob = dataURLtoBlob(media);
      // Trigger handleFileUpload in the parent component
      // Assuming 'image' is the fileType for image uploads
      handleFileUpload(blob, "image", "removeImage");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "auto",
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
                fontSize: { lg:"11px",md: "9px", sm: "9px", xs: "9px" },
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

const ImageUploaders: React.FC<
  MediaBoxProps & {
    handleFileUpload: (file: Blob, fileType: string, action: string) => void;
  }
> = ({ media, onChange, onRemove, label, handleFileUpload }) => {
  const handleRemove = () => {
    onRemove();
    if (media) {
      const blob = dataURLtoBlob(media);
      handleFileUpload(blob, "menu", "removeMenu");
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{
        width: "auto",
        height: "150px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        textAlign: "center",
        background: "#ffff",
        border: "2px dashed #FFC000",
        marginTop: "25px",
        marginLeft: "3px",
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

const VideoUploader: React.FC<
  MediaBoxProps & {
    handleFileUpload: (file: Blob, fileType: string, action: string) => void;
  }
> = ({ media, onChange, onRemove, label, handleFileUpload }) => {
  const handleRemove = () => {
    onRemove();

    if (media) {
      const blob = dataURLtoBlob(media);
      handleFileUpload(blob, "video", "removeVideo");
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{
        width: "260px",
        height: "163px",
        // position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        textAlign: "center",
        background: "#ffff",
        border: "2px dashed #FFC000",
        marginTop: "40px",
        marginLeft: "3px",
        transition: "none",
      }}
      onClick={() => {
        if (!media) {
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "video/*";
          fileInput.style.display = "none";
          fileInput.onchange = onChange as unknown as (
            this: GlobalEventHandlers,
            ev: Event
          ) => any;
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
            // width="100%"
            // height="100%"
            controls
            style={{
              position: "absolute",
              // height="100%",
              // top: '50%',
              // left: '50%',
              // transform: 'translate(-50%, -50%)',
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              width: "254px",
              height: "157px",
              marginLeft: "-127px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
              zIndex: 0,
            }}
          ></Box>
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
                fontSize: { lg:"14px",md: "9px", sm: "9px", xs: "9px" },
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
      <CloseIcon
        style={{
          color: "white",
          cursor: "pointer",
          position: "fixed",
          fontSize: "41px",
          marginLeft: "89px",
        }}
        onClick={handleRemove}
      />
    </Paper>
  );
};

export default Index;
