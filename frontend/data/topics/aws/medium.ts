export default [
  {
    id: 'aws-m-1',
    question: 'Explain the difference between S3 and EBS.',
    answer: 'S3 (Simple Storage Service) is object storage for storing files and data accessible via REST API, while EBS (Elastic Block Store) provides block-level storage volumes for EC2 instances.\n\n**S3** is like a web-accessible file cabinet - great for storing files, images, backups that you access over the internet.\n\n**EBS** is like a hard drive attached to your computer (EC2 instance) - it provides persistent storage that stays with your virtual machine.',
    image_suggestion: 'A comparison diagram showing S3 as web-accessible storage and EBS as attached storage to EC2 instances.'
  },
  {
    id: 'aws-m-2',
    question: 'What is a VPC?',
    answer: 'A Virtual Private Cloud (VPC) is a virtual network dedicated to your AWS account. It is logically isolated from other virtual networks in the AWS Cloud.\n\nThink of a VPC as your own private section of the AWS cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment.',
    image_suggestion: 'A network diagram showing a VPC with subnets, security groups, and various AWS resources within it.'
  }
];
