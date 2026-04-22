import SubjectPage from "./SubjectPage";

const ComputerNetworks = () => {
  const intro =
    "Computer Networks is heavily asked in backend, systems, and service-based company interviews. Focus on layers, protocols, addressing, TCP/UDP, and core troubleshooting concepts.";

  const topics = [
    {
      title: "OSI and TCP/IP Models",
      content:
        "Interviewers often use network layers to test conceptual clarity.",
      points: [
        "OSI has 7 layers, while TCP/IP is a practical 4-layer model.",
        "Application layer handles protocols like HTTP, FTP, SMTP, and DNS.",
        "Transport layer handles end-to-end delivery using TCP or UDP.",
        "Network layer manages logical addressing and routing using IP.",
        "Data link layer handles framing, MAC addressing, and local delivery.",
      ],
      interviewFocus:
        "Know common protocols at each layer and explain why TCP/IP is used more in practice.",
    },
    {
      title: "TCP vs UDP",
      content:
        "This is one of the most common placement questions in networks.",
      points: [
        "TCP is connection-oriented, reliable, and ordered.",
        "UDP is connectionless, faster, and does not guarantee delivery.",
        "TCP uses acknowledgments, flow control, and retransmission.",
        "UDP is used in applications where low latency is more important than reliability.",
        "Examples: HTTP traditionally uses TCP, while DNS queries and streaming often use UDP.",
      ],
      interviewFocus:
        "Always compare reliability, speed, ordering, and real-world use cases.",
    },
    {
      title: "IP Addressing and Routing",
      content:
        "Basic addressing and routing questions are asked very frequently.",
      points: [
        "IPv4 uses 32 bits and IPv6 uses 128 bits.",
        "Subnetting divides networks into smaller logical networks.",
        "Routers forward packets based on destination IP address.",
        "MAC address works at data link layer, IP address works at network layer.",
        "Default gateway is the router used to leave the local network.",
      ],
      interviewFocus:
        "Be able to explain the difference between MAC address and IP address clearly.",
    },
    {
      title: "Important Protocols",
      content:
        "Protocol questions help interviewers check practical understanding of the web and enterprise systems.",
      points: [
        "HTTP is stateless request-response communication used on the web.",
        "HTTPS adds security using TLS/SSL.",
        "DNS converts domain names into IP addresses.",
        "ARP maps IP address to MAC address in a local network.",
        "DHCP automatically assigns IP configuration to hosts.",
      ],
      interviewFocus:
        "Prepare the full path of opening a website: DNS lookup, TCP handshake, HTTP request, response.",
    },
    {
      title: "Flow Control and Congestion Control",
      content:
        "This is a strong differentiator in technical interviews because many candidates skip it.",
      points: [
        "Flow control prevents the sender from overwhelming the receiver.",
        "Congestion control prevents the network from being overloaded.",
        "TCP uses a sliding window for flow control.",
        "Congestion control concepts include slow start and congestion avoidance.",
        "Good answers should clearly separate receiver-side limitation from network-side limitation.",
      ],
      interviewFocus:
        "Explain flow control vs congestion control in one sentence each before going deeper.",
    },
  ];

  return (
    <SubjectPage
      subjectName="Computer Networks"
      intro={intro}
      topics={topics}
    />
  );
};

export default ComputerNetworks;
