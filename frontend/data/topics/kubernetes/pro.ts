export default [
  {
    id: 'k8s-p-1',
    question: 'How do you implement custom resource definitions (CRDs)?',
    answer: 'Custom Resource Definitions (CRDs) extend the Kubernetes API to manage custom resources:\n\n1. **Create a CRD YAML manifest** defining the schema and validation rules\n2. **Apply the CRD** to extend the Kubernetes API\n3. **Implement a custom controller** using client-go libraries\n4. **Watch for custom resource events** and reconcile desired state\n5. **Handle CRUD operations** for your custom resources\n6. **Implement proper error handling** and status reporting\n7. **Add webhooks** for admission control and validation',
    image_suggestion: 'An architecture diagram showing CRD creation, controller implementation, and the reconciliation loop.'
  },
  {
    id: 'k8s-p-2',
    question: 'Explain Kubernetes networking and CNI.',
    answer: 'Kubernetes networking follows a flat network model where:\n\n**CNI (Container Network Interface)** is a specification for configuring network interfaces in containers. Popular CNI plugins include:\n\n- **Flannel**: Simple overlay network\n- **Calico**: Network policies and BGP routing\n- **Weave**: Mesh networking with encryption\n- **Cilium**: eBPF-based networking and security\n\n**Key networking concepts:**\n- Pod-to-Pod communication without NAT\n- Service discovery and load balancing\n- Network policies for security\n- Ingress controllers for external access',
    image_suggestion: 'A network topology diagram showing CNI implementation with pods, services, and external traffic flow.'
  }
];
