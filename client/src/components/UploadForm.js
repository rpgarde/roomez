import React , {useState} from 'react';
import S3FileUpload from 'react-s3';

const S3_BUCKET =process.env.REACT_APP_S3_BUCKET;
const REGION =process.env.REACT_APP_AWS_REGION;
const ACCESS_KEY =process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadForm = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        e.preventDefault()
        setSelectedFile(e.target.files[0]);
            S3FileUpload
                .uploadFile(e.target.files[0], config)
                .then(data => {
                    props.handlePhoto({
                    photo:data.location
                })})
                .catch(err => console.error(err))
    }

    return <div>
            <label className="form-label" htmlFor="fileUpload">Upload a Photo</label>
            <input name = "photo" type="file" className="form-control" id="fileUpload" onChange={handleFileInput}  />
    </div>
}

export default UploadForm;