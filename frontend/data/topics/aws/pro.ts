export default [
  {
    id: 'aws-p-1',
    question: 'How would you implement a multi-region disaster recovery strategy?',
    answer: 'A comprehensive multi-region disaster recovery strategy involves:\n\n1. **Cross-region replication** for critical data using S3, RDS, and DynamoDB\n2. **Route 53** for DNS failover and health checks\n3. **Automated backups** with point-in-time recovery\n4. **CloudFormation** templates for infrastructure replication\n5. **CloudWatch** monitoring and alerting\n6. **Clear RTO/RPO requirements** (Recovery Time/Point Objectives)\n7. **Regular disaster recovery testing** and runbooks',
    image_suggestion: 'An architecture diagram showing multi-region setup with replication, failover mechanisms, and monitoring.'
  },
  {
    id: 'aws-p-2',
    question: 'Explain AWS Lambda cold starts and optimization strategies.',
    answer: 'Cold starts occur when AWS Lambda creates a new execution environment for your function. This happens when:\n\n- Function hasn\'t been invoked recently\n- Concurrent executions exceed current containers\n- Function code or configuration changes\n\n**Optimization strategies:**\n- Minimize deployment package size\n- Use provisioned concurrency for critical functions\n- Optimize initialization code\n- Choose appropriate memory allocation\n- Use connection pooling and caching\n- Consider container reuse patterns',
    image_suggestion: 'A timeline diagram showing Lambda cold start vs warm start execution with optimization techniques.'
  }
];
