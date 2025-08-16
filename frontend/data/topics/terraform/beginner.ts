export default [
  {
    id: 'tf-b-1',
    question: 'What is Terraform?',
    answer: 'Terraform is an Infrastructure as Code (IaC) tool that allows you to define and provision infrastructure using declarative configuration files. It supports multiple cloud providers and maintains state to track resource changes.\n\nThink of Terraform as a **blueprint system** for your cloud infrastructure. Instead of manually clicking through cloud consoles to create servers, databases, and networks, you write a recipe (configuration file) that describes what you want, and Terraform builds it for you.',
    image_suggestion: 'A diagram showing Terraform configuration files being applied to create cloud infrastructure across multiple providers.'
  },
  {
    id: 'tf-b-2',
    question: 'What is Terraform state?',
    answer: 'Terraform state is a file that keeps track of the real-world resources that Terraform manages. It maps your configuration to actual infrastructure.\n\nThink of state as Terraform\'s **memory** - it remembers what it created so it can update or delete resources later. Without state, Terraform wouldn\'t know which cloud resources belong to your project.',
    image_suggestion: 'A diagram showing the relationship between Terraform configuration, state file, and actual cloud resources.'
  }
];
