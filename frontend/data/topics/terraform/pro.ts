export default [
  {
    id: 'tf-p-1',
    question: 'How do you implement Terraform modules for reusability?',
    answer: 'Creating reusable Terraform modules involves:\n\n**Module structure:**\n- `main.tf`: Primary configuration\n- `variables.tf`: Input parameters\n- `outputs.tf`: Return values\n- `versions.tf`: Provider requirements\n- `README.md`: Documentation\n\n**Best practices:**\n- Use semantic versioning for module releases\n- Implement variable validation and descriptions\n- Provide comprehensive examples\n- Follow naming conventions\n- Publish to registries (Terraform Registry, private registries)\n- Include automated testing with Terratest\n- Document all inputs, outputs, and requirements',
    image_suggestion: 'A module architecture diagram showing structure, versioning, and registry publication workflow.'
  },
  {
    id: 'tf-p-2',
    question: 'Explain Terraform workspaces and state management strategies.',
    answer: 'Terraform workspaces allow multiple state files for the same configuration, enabling environment separation:\n\n**Workspace strategies:**\n- **Environment separation**: dev, staging, prod\n- **Feature branches**: temporary workspaces for testing\n- **Team isolation**: separate workspaces per team\n\n**State management patterns:**\n- Remote state with S3 + DynamoDB locking\n- State file encryption and access control\n- Cross-workspace data sharing with `terraform_remote_state`\n- Automated state backup and recovery\n- State file versioning and rollback procedures',
    image_suggestion: 'A diagram showing multiple workspaces with separate state files and remote state management setup.'
  }
];
