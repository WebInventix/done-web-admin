import { Button, Stack, Typography } from "@mui/material"
import { GrFormAdd } from 'react-icons/gr'
import { themeGray, themeOrange } from "../../../utils/colorTheme"

const squareSize = '220px'


const displayInputSelectedImage = (imageFile) => {
    console.log("==============",imageFile);
    if (imageFile.slice(0, 4) === 'http') return imageFile
    else return URL.createObjectURL(imageFile)
}
export const Upload_image_component = (props) => {
    const { selectedImageHandle, selectedImage, profile_image_error, value } = props


    // const { text_color, border_color, bg_color } = error_color_palette


    return (<Stack sx={{ mt: '10px', mb: '20px' }}>


        <Stack direction='row' justifyContent='flex-start' alignItems='center' flexWrap='wrap'  >

            {!selectedImage ? <Stack justifyContent='center' alignItems='center' sx={{ width: squareSize, height: squareSize, backgroundColor: '#f4f4f4', marginRight: '15px', marginTop: '15px', borderRadius: '5px' }}>
                <Button
                    variant="text"
                    component="label"
                    sx={{ width: '100%', height: '100%', color: 'gray' }}
                >
                    <Typography textTransform='none' align='center' fontSize={12} variant='body1' color={'lightgray'}>

                        <GrFormAdd color={themeGray} size={30} />
                    </Typography>
                    <input
                        onChange={(e) => selectedImageHandle(e)}
                        type="file"
                        hidden
                    />
                </Button>
            </Stack>

                :

                // <Render_image url={displayInputSelectedImage(selectedImage)}/>


                selectedImage?.name?.split(".")[1] === "pdf" ?
                    <p style={{ color: "gray", fontWeight: "bold", fontSize: 16 }}>{selectedImage?.name}</p> :
                    <Stack justifyContent='center' alignItems='center'
                        sx={{
                            width: squareSize, height: squareSize, backgroundImage: `url(${displayInputSelectedImage(selectedImage)})`,
                            backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', marginRight: '15px', marginTop: '15px', borderRadius: '5px'
                        }}
                    >
                    </Stack>
            }


        </Stack>



        {selectedImage && <Stack sx={{ width: squareSize }} mt={1}>

            <Button
                variant="text"
                component="label"
            >
                <input
                    onChange={(e) => selectedImageHandle(e)}
                    type="file"
                    hidden
                />
                <Typography align='center' color={themeOrange} fontSize={13} textTransform='none'>Change file</Typography>
            </Button>
        </Stack>}


    </Stack>
    )
}

// import React, { useState } from 'react';
// import ButtonComp from '../ButtonComp';
// import { themeOrange } from '../../../utils/colorTheme';
// import { Grid } from '@mui/material';

// function ImagePicker() {
//     const [selectedImages, setSelectedImages] = useState([]);

//     // Image select handler
//     const handleImageSelect = (e) => {
//         const selectedFiles = Array.from(e.target.files);

//         if (selectedFiles.length > 0) {
//             const imageURLs = selectedFiles.map((file) => URL.createObjectURL(file));
//             setSelectedImages([...selectedImages, imageURLs]);
//         }
//     };
//     console.log(selectedImages);

//     return (
//         <div style={{width:"100%"}}>
//             <input
//                 type="file"
//                 accept="image/*, application/pdf"
//                 multiple
//                 onChange={handleImageSelect}
//                 style={{ display: 'none' }}
//                 id="imageInput"
//             />
//             <label htmlFor="imageInput" style={{ cursor: 'pointer' }}>
//                 sadsa
//                 <ButtonComp
//                     // onClick={selectedImageHandle}
//                     backgroundColor={themeOrange}
//                     style={{ padding: "10px", fontSize: "16px", borderRadius: "6px" }}
//                     label="Upload"
//                 />
//             </label>
//                 <p>Selected Images:</p>
//             <Grid width={"100%"} gap={2} container>

//                 {selectedImages.length > 0 && (
                 
//                         selectedImages.map((imageUrl, index) => <>
                  
//                          <Grid style={{backgroundColor:"rgba(0,0,0,0.1)",padding:10,}} item xs={6} sm={4} md={2} lg={2} >
//                                 <img
//                                     key={index}
//                                     src={imageUrl}
//                                     alt={`Image ${index + 1}`}
//                                     style={{ maxWidth: '100px', height:"150px",objectFit:"contain",textAlign:"center" }}
//                                 />
                         
//                             </Grid>
//                             </>
//                         )
                    
//                 )}
//             </Grid>
//         </div>
//     );
// }

// export default ImagePicker;

