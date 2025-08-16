export default [
  {
    id: 'k8s-m-1',
    question: 'Explain the difference between Deployment and StatefulSet.',
    answer: '**Deployments** manage stateless applications with identical pods, while **StatefulSets** manage stateful applications requiring stable network identities, persistent storage, and ordered deployment/scaling.\n\n**Deployment** is like managing identical workers - any worker can do the job, and you can replace them easily.\n\n**StatefulSet** is like managing a team where each member has a specific role and identity - like database replicas where each has a specific role (primary, secondary) and persistent data.',
    image_suggestion: 'A comparison showing Deployment with interchangeable pods vs StatefulSet with ordered, persistent pods.'
  },
  {
    id: 'k8s-m-2',
    question: 'What are ConfigMaps and Secrets?',
    answer: '**ConfigMaps** store non-sensitive configuration data in key-value pairs, while **Secrets** store sensitive information like passwords, tokens, and keys.\n\n**ConfigMap** is like a settings file that your application can read - database URLs, feature flags, etc.\n\n**Secret** is like a locked safe where you store sensitive information - passwords, API keys, certificates. Kubernetes encrypts Secrets and provides controlled access.',
    image_suggestion: 'A diagram showing ConfigMaps as open configuration files and Secrets as encrypted, locked storage.'
  }
];
