export default [
  {
    id: 'tf-m-1',
    question: 'Explain Terraform state and its importance.',
    answer: 'Terraform state is a file that maps real-world resources to your configuration. It tracks metadata, improves performance, and enables collaboration.\n\n**Why state is important:**\n- **Resource mapping**: Links configuration to actual resources\n- **Metadata storage**: Tracks resource dependencies and attributes\n- **Performance**: Caches resource attributes to avoid API calls\n- **Collaboration**: Enables team workflows with remote state\n\n**Best practices:**\n- Store state remotely (S3, Azure Storage, GCS)\n- Enable state locking to prevent conflicts\n- Never edit state files manually\n- Use workspaces for environment separation',
    image_suggestion: 'A workflow diagram showing state file management, remote storage, and team collaboration patterns.'
  },
  {
    id: 'tf-m-2',
    question: 'What are Terraform modules?',
    answer: 'Terraform modules are reusable packages of Terraform configuration that can be called and configured by other configurations.\n\nThink of modules as **LEGO blocks** for infrastructure - pre-built components that you can combine to build complex systems. A module might define a complete web application setup (load balancer, servers, database) that you can reuse across projects.',
    image_suggestion: 'A diagram showing how modules encapsulate infrastructure components and can be reused across different projects.'
  }
];
