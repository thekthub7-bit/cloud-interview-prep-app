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
  },
  {
    id: 'k8s-b-4',
    question: 'What is a Deployment in Kubernetes?',
    answer: 'A Deployment in Kubernetes is like a **smart manager** that ensures your application is always running the way you want it.\n\nThink of a Deployment as a **supervisor** who:\n- Makes sure you always have the right number of copies of your app running\n- Automatically replaces any copies that crash or stop working\n- Helps you update your app to new versions safely\n- Can scale your app up or down based on demand\n\nIt\'s like having a reliable assistant who constantly monitors your application and fixes problems automatically.',
    image_suggestion: 'A diagram showing a Deployment managing multiple Pod replicas with automatic scaling and updates.'
  },
  {
    id: 'k8s-b-5',
    question: 'What is a Namespace in Kubernetes?',
    answer: 'A Namespace in Kubernetes is like creating **separate rooms** or **departments** within your Kubernetes cluster.\n\nImagine a large office building where different teams work. Each team gets their own floor or section - that\'s what a Namespace does. It allows you to:\n- Separate different projects or environments (like development, testing, production)\n- Organize resources so teams don\'t interfere with each other\n- Apply different rules and permissions to different areas\n- Keep things tidy and organized\n\nIt\'s like having separate workspaces for different purposes, all within the same building.',
    image_suggestion: 'A diagram showing a Kubernetes cluster divided into multiple namespaces with different resources in each.'
  }
];
