import React, {useState} from 'react'
import { useMutation, gql } from '@apollo/client'

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!){
        uploadFile(file:$file){
            url
        }
    }
`

export default function UploadForm(props) {
    const [fileState,SetFileState] = useState('')

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
        e.preventDefault()
        try {
            const file = await e.target.files[0]
            if (!file) return
            await uploadFile({ variables: { file } })
            SetFileState(file.name)
            props.handleUserPhoto({
                photo:file.name
            })
            console.log(file.name)
        }
        catch(err){
            console.error(err)
        }
    }
    return (
        <div>
            <label class="form-label" for="fileUpload">Upload a Photo</label>
            <input name = "photo" type="file" class="form-control" id="fileUpload" onChange={handleFileChange}  />
        </div>
    )
}