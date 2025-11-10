import SubjectPage from "./SubjectPage";

const ComputerNetworks = () => {
  const intro = "Understand network protocols, TCP/IP, OSI layers, and routing concepts.";
  const topics = [
    { title: "Introduction to Networking", content: "A computer network is a set of interconnected devices that share resources and information." },
    { title: "OSI Model", content: "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
    { title: "TCP/IP Protocols", content: "TCP/IP is a set of protocols for communication over the internet." },
    { title: "Routing and Switching", content: "Routing determines the path for data packets; switching connects devices within a network." },
  ];

  return <SubjectPage subjectName="Computer Networks" intro={intro} topics={topics} />;
};

export default ComputerNetworks;
