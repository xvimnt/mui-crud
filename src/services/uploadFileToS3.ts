import AWS from 'aws-sdk'

export default async function uploadFileToS3 (file: any, bucket_name: string, handleUrl: Function) {

    const myBucket = new AWS.S3({
        params: { Bucket: bucket_name },
        region: 'us-east-1',
    })

    const params: AWS.S3.PutObjectRequest = {
        ACL: 'public-read',
        Body: file,
        Bucket: bucket_name,
        Key: file.name
    };

    myBucket.upload(params, (err, data) => {
        if(err) throw new Error("Error uploading file: " + err);
        handleUrl(data.Location)
    })
}