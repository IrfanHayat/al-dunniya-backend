import AWS from 'aws-sdk';

const s3Configuration = () => {
	const BUCKET = process.env.awsBucketName;
	const REGION = 'us-east-2';
	const ACCESS_KEY = 'AKIAJZ3VQPKWZK3ZWOHA';
	const SECRET_KEY = process.env.awsSecretAccessKey;
	AWS.config.update({
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_KEY,
		region: REGION,
	});
};

export default s3Configuration;
