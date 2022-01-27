import React, { useEffect, useState } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  ButtonBase,
  Typography,
  Divider,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import utils from "../../../libs/utils/utils";
import UploadFileInput from "../UploadFileInput/UploadFileInput";
import { Box } from "@mui/system";
import { FileInfo } from "../../../classes/FileInfo";
const TAG = "GALLERY IMAGES";
type GalleryImagesProps = {
  onSelect?: (res: string) => void;
  onRandomImages?: (res: GalleryImagesType[]) => void;
  limitDefaultImages?: number;
};
export type GalleryImagesType = {
  img: string;
  title: string;
  thumb?: string;
  author: string;
  alt?: string;
  rows?: number;
  cols?: number;
  featured?: number;
};
const GalleryImages: React.FC<GalleryImagesProps> = ({
  onSelect,
  onRandomImages,
  limitDefaultImages = 3,
}) => {
  console.log(TAG, "render");
  const [selected, setSelected] = useState("");
  const [images, setImages] = useState<GalleryImagesType[]>([]);
  const [imageUploaded, setImageUploaded] = useState<null | FileInfo>(null);
  useEffect(() => {
    const page = parseInt(utils.getRandomNumber(1, 20) + "", 10);
    fetch(
      `https://api.unsplash.com/photos/?client_id=wRB2U4OcB5yNvZPHSiV7ocQ-BvZ9JdgGoC8xa-B0Kmg&per_page=${limitDefaultImages}&page=${page}`
    )
      .then(async (res) => {
        const arrRes: any[] = await res.json();
        const arr: GalleryImagesType[] = [];
        for (const key in arrRes) {
          const element = arrRes[key];
          arr.push({
            img: element.urls.regular,
            thumb: element.urls.thumb,
            title: element.alt_description || element.user.username,
            alt: element.alt_description,
            author: element.user.name,
          });
        }
        console.log(arr);
        setImages(arr);
        if (onRandomImages) onRandomImages(arr);
      })
      .catch(() => setImages([]));
  }, [onRandomImages, limitDefaultImages]);

  useEffect(() => {
    if (onSelect) {
      console.log("selected", selected);
      onSelect(selected);
    }
  }, [selected, onSelect]);

  return (
    <div className="GalleryImages">
      <ImageList sx={{ width: "100%" }}>
        <ImageListItem key="Subheader" cols={2}>
          <Typography variant="h5">Imagenes de muestra</Typography>
          <Typography variant="caption">
            Selecciona una imagen o sube una tuya.
          </Typography>
          <Box
            width="100%"
            py={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <UploadFileInput
              basePath="businessImages"
              onCreate={(res) => {
                setImageUploaded(res);
                setSelected(res.urlDownload);
              }}
            />
            {imageUploaded && (
              <Box width={"20%"} px={3}>
                <img
                  width="100%"
                  src={imageUploaded?.urlDownload}
                  alt="thumnail uploaded"
                />
              </Box>
            )}
          </Box>
          <Divider sx={{ mb: 2 }}>Listado</Divider>
        </ImageListItem>

        {images.map((item) => (
          <ButtonBase key={item.img} onClick={() => setSelected(item.img)}>
            <ImageListItem sx={{ maxHeight: 250, overflow: "hidden" }}>
              <img
                src={`${item.thumb}`}
                srcSet={`${item.thumb}`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{
                      color: (t) =>
                        selected !== item.img
                          ? "rgba(255, 255, 255, 0.54)"
                          : t.palette.primary.main,
                    }}
                    aria-label={`info about ${item.title}`}
                  >
                    <CheckCircle />
                  </IconButton>
                }
              />
            </ImageListItem>
          </ButtonBase>
        ))}
      </ImageList>
    </div>
  );
};
export default GalleryImages;
