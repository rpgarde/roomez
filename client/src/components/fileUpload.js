import React from 'react'
import { useMutation, gql } from '@apollo/client'

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!){
        uploadFile(file:$file){
            url
        }
    }
`

export default function UploadForm() {
    const [uploadFile, { error }] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    })

    // function handleFileChange({
    //     target: {
    //       validity,
    //       files: [file],
    //     },
    //   }) {
    //     if (validity.valid) uploadFile({ variables: { file } });
    //   }
    

    const handleFileChange = async (e) => {
        try {
            const file = e.target.files[0]
            if (!file) return
            await uploadFile({ variables: { file } })
        }
        catch(err){
            console.error(err)
        }
    }
    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange} />
        </div>
    )
}