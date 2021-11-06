import React , {useState} from 'react';
import S3FileUpload from 'react-s3';
import {generateRandomString} from '../utils/helpers'

const S3_BUCKET ='roomez';
const REGION ='ap-southeast-2';
const ACCESS_KEY ='AKIATIWBIG3H4K6JBXKP';
const SECRET_ACCESS_KEY ='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';

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