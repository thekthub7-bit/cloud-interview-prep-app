export default [
  {
    id: 'ans-b-1',
    question: 'What is Ansible?',
    answer: 'Ansible is an open-source automation tool for configuration management, application deployment, and task automation. It uses YAML playbooks and is agentless, connecting to nodes via SSH.\n\nThink of Ansible as a **remote control** for your servers. Instead of logging into each server individually to install software or change settings, you write simple instructions (playbooks) and Ansible executes them on all your servers at once.',
    image_suggestion: 'A diagram showing Ansible controlling multiple servers remotely via SSH with playbook execution.'
  },
  {
    id: 'ans-b-2',
    question: 'What is an Ansible playbook?',
    answer: 'An Ansible playbook is a YAML file that defines a series of tasks to be executed on remote hosts. Playbooks describe the desired state of your systems.\n\nThink of a playbook as a **recipe** or **instruction manual** that tells Ansible exactly what to do on your servers - install packages, copy files, start services, etc.',
    image_suggestion: 'A visual representation of a YAML playbook with tasks flowing to multiple target servers.'
  }
];
