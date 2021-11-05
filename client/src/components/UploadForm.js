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

    const handleFileChange = async (e) => {
        e.preventDefault()
        try {
            const file = await e.target.files[0]
            if (!file) return
            await uploadFile({ variables: { file } })
            SetFileState(file.name)
            props.handlePhoto({
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
            <label className="form-label" htmlFor="fileUpload">Upload a Photo</label>
            <input name = "photo" type="file" className="form-control" id="fileUpload" onChange={handleFileChange}  />
        </div>
    )
}