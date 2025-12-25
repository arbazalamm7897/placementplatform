const startInterview = async () => {
  if (!file) return alert("Please upload your resume");

  try {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", "123");

    const res = await fetch("http://localhost:5000/api/interview/start", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.sessionId) {
      navigate(`/ai-interview/session/${data.sessionId}`);
    } else {
      alert("Interview could not start");
    }
  } catch (err) {
    console.error(err);
    alert("Backend not reachable");
  }
};
