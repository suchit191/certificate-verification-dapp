import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ABI = [
  "function addCertificate(string _certificateId, string _studentName, string _course, string _grade) public",
  "function verifyCertificate(string _certificateId) public view returns (string, string, string, bool)"
];

function CertificateVerification() {
  const [certificateId, setCertificateId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [result, setResult] = useState("");

  async function getContract() {
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  }

  async function addCertificate() {
    const contract = await getContract();

    const tx = await contract.addCertificate(
      certificateId,
      studentName,
      course,
      grade
    );

    await tx.wait();

    alert("Certificate added successfully");
  }

  async function verifyCertificate() {
  try {
    const contract = await getContract();

    const data = await contract.verifyCertificate(certificateId);

    alert("Verify result received");

    if (data[3] === true) {
      setResult(
        `Valid Certificate ✅
Student: ${data[0]}
Course: ${data[1]}
Grade: ${data[2]}`
      );
    } else {
      setResult("Invalid Certificate ❌");
    }
  } catch (error) {
    console.log(error);
    alert("Error while verifying certificate. Check console.");
  }
}

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Certificate Verification DApp</h1>

      <input placeholder="Certificate ID" onChange={(e) => setCertificateId(e.target.value)} />
      <br /><br />

      <input placeholder="Student Name" onChange={(e) => setStudentName(e.target.value)} />
      <br /><br />

      <input placeholder="Course" onChange={(e) => setCourse(e.target.value)} />
      <br /><br />

      <input placeholder="Grade" onChange={(e) => setGrade(e.target.value)} />
      <br /><br />

      <button onClick={addCertificate}>Add Certificate</button>

      <button onClick={verifyCertificate} style={{ marginLeft: "10px" }}>
        Verify Certificate
      </button>

      <pre style={{ marginTop: "30px", fontSize: "18px" }}>{result}</pre>
    </div>
  );
}

export default CertificateVerification;