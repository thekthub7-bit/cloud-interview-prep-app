export default [
  {
    id: 'ans-p-1',
    question: 'How do you implement Ansible Vault for secrets management?',
    answer: 'Ansible Vault encrypts sensitive data within Ansible projects:\n\n**Implementation steps:**\n1. **Create encrypted files** with `ansible-vault create`\n2. **Encrypt existing files** with `ansible-vault encrypt`\n3. **Use vault IDs** for multiple vault passwords\n4. **Store vault passwords** securely (files, scripts, external systems)\n5. **Integrate with CI/CD** using vault password files\n6. **Implement key rotation** procedures\n7. **Use `--ask-vault-pass`** for interactive password entry\n\n**Best practices:**\n- Separate vault files from regular variables\n- Use different vault IDs for different environments\n- Never commit vault passwords to version control',
    image_suggestion: 'A security diagram showing encrypted vault files, password management, and CI/CD integration.'
  },
  {
    id: 'ans-p-2',
    question: 'Explain Ansible Galaxy and custom collection development.',
    answer: 'Ansible Galaxy is a hub for sharing Ansible content including roles and collections:\n\n**Collections** are distribution format for Ansible content:\n- Modules, plugins, roles, and playbooks\n- Namespace organization (e.g., `community.general`)\n- Version management and dependencies\n\n**Custom collection development:**\n1. Initialize collection structure with `ansible-galaxy collection init`\n2. Develop modules, plugins, and roles\n3. Define metadata in `galaxy.yml`\n4. Build collection with `ansible-galaxy collection build`\n5. Publish to Galaxy or private repositories\n6. Implement automated testing and CI/CD',
    image_suggestion: 'A workflow diagram showing collection development, building, and distribution through Galaxy.'
  }
];
