// Load the AWS SDK for Node.js
const { v4: uuidv4 } = require('uuid');
var AWS = require('aws-sdk');

// Set the region 
var accessKeyId =  process.env.AWS_ACCESS_KEY || "AKIAVQHLCLVONJK3PFNR";
var secretAccessKey = process.env.AWS_SECRET_KEY || "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";

AWS.config.update({
    signatureVersion: 'v4',
    region: 'us-east-1',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    ACL: 'public-read',
    "x-amz-acl":"public-read",
    ContentEncoding: 'base64',
    // ContentType: 'image/jpeg',
    ACL: 'public-read'
});
bucketname= "ks-insta-bucket"
folder = "image/"

// Create S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
var file = "\images\\DahliaPeony.jpg"; //impressme.jpg";

ext = 'jpg' //this comes from filestream->name
username = "demo" //this is already available 
uuid = uuidv4();
key= folder+username+uuid+"."+ext
var uploadParams = {Bucket: bucketname, Key:key, Body: ''};

// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});

uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = key; //""+path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});