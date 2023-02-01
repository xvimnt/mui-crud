import { Box, Button } from '@mui/material';

interface PropsType {
    setPreview: any,
    setFile: any,
    file: any,
    preview: any,
}

export default function UploadImages(props: PropsType) {
    const { setPreview, preview, setFile, file } = props

    function selectFile(event: any) {
        setPreview(URL.createObjectURL(event.target.files[0]))
        setFile(event.target.files[0])
    }

    return (
        <Box sx={{ marginTop: 3 }}>
            <label htmlFor="btn-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={selectFile} />
                <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span" >
                    Subir Imagen
                </Button>
            </label>
            <div className="file-name">
                {file ? file.name : null}
            </div>
            {preview && (
                <div>
                    <Box
                        component="img"
                        sx={{
                            height: 233,
                            width: 350,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        alt={file.name}
                        src={preview}
                    />
                </div>
            )}
        </Box>
    );
}