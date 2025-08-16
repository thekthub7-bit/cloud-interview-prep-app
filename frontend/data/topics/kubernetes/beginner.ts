export default [
  {
    id: 'k8s-b-1',
    question: 'What is Kubernetes?',
    answer: 'Imagine you have many small digital boxes (containers) that contain your applications. Managing these boxes — making sure they are always running, updated, and have enough resources — can be very complicated.\n\n**Kubernetes (often called K8s)** is like a very smart **orchestra conductor** or a **robot manager** for these digital boxes. Its main job is to **automatically handle** where your application boxes run, make sure they stay healthy, and quickly give them more resources if many people start using your app. It ties everything together so your applications run smoothly and reliably, without you having to manually move or start each box.',
    image_suggestion: 'A high-level diagram showing a Kubernetes cluster managing multiple containers, with arrows indicating automation and scaling.'
  },
  {
    id: 'k8s-b-2',
    question: 'What is a Pod?',
    answer: 'A Pod is the smallest deployable unit in Kubernetes. Think of a Pod as a **wrapper** around one or more containers that work together.\n\nImagine a Pod as a **shared apartment** where containers live together. They share the same network (IP address) and storage, and they can easily talk to each other. Usually, a Pod contains just one main container, but sometimes you might have a helper container (called a sidecar) living in the same Pod.',
    image_suggestion: 'A diagram showing a Pod containing one or more containers sharing network and storage resources.'
  },
  {
    id: 'k8s-b-3',
    question: 'What is a Service in Kubernetes?',
    answer: 'A Service in Kubernetes is like a **permanent address** or **phone number** for your applications.\n\nSince Pods can come and go (they might restart, move, or be replaced), their IP addresses change. A Service provides a **stable way** to reach your application, no matter which Pod is actually running it.\n\nThink of it like a restaurant\'s phone number - even if the staff changes, customers can always call the same number to reach the restaurant.',
    image_suggestion: 'A diagram showing how a Service provides stable access to multiple Pods with changing IP addresses.'
  }
];
