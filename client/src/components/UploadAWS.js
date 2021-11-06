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

const UploadAWS = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        // const randomFileName = new File(e.target.files[0],'test.jpg')
        // console.log(randomFileName)
        console.log(e.target.files[0])
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        S3FileUpload
            .uploadFile(file, config,'qwkelqwe')
            .then(data => console.log(data.location))
            .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadAWS;
