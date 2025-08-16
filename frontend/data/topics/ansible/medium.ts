export default [
  {
    id: 'ans-m-1',
    question: 'Explain Ansible roles and their structure.',
    answer: 'Ansible roles organize playbooks into reusable components with standardized directory structure including tasks, handlers, variables, templates, and files directories for better organization and reusability.\n\n**Role structure:**\n- `tasks/`: Main list of tasks\n- `handlers/`: Handlers triggered by tasks\n- `templates/`: Jinja2 template files\n- `files/`: Static files to copy\n- `vars/`: Role-specific variables\n- `defaults/`: Default variables\n- `meta/`: Role metadata and dependencies',
    image_suggestion: 'A directory tree showing the standard Ansible role structure with all components.'
  },
  {
    id: 'ans-m-2',
    question: 'What are Ansible handlers?',
    answer: 'Handlers are special tasks that run only when notified by other tasks, typically used for service restarts or configuration reloads.\n\nThink of handlers as **event listeners** - they wait for a specific trigger (like a configuration file change) and then perform an action (like restarting a service). This ensures services are only restarted when necessary.',
    image_suggestion: 'A flow diagram showing tasks notifying handlers and handlers executing conditionally.'
  }
];
